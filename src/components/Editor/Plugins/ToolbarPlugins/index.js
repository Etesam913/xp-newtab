import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isParentElementRTL, $isAtNodeEnd } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { createPortal } from "react-dom";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";
import { BlockOptionsDropdownList } from "./BlockOptions";
import FloatingLinkEditor from "./FloatingLinkEditor";
import styled from "styled-components";
import { FlexContainer } from "../../../../styles/Layout";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
]);

function Select({ options, value, onChange }) {
  return (
    <LanguagesDropdown value={value} onChange={onChange}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </LanguagesDropdown>
  );
}

export function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export default function ToolbarPlugins() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguages = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <FlexContainer flexWrap="wrap" as="span" margin="0 0.15rem 0 0">
        <button
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <UndoIcon className="format" />
        </button>
        <button
          style={{ marginLeft: "0.25rem" }}
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <RedoIcon className="format" />
        </button>
      </FlexContainer>
      <FlexContainer flexWrap="wrap" as="span" justifyContent="flex-start">
        {supportedBlockTypes.has(blockType) && (
          <BlockOptionsDropdownList editor={editor} blockType={blockType} />
        )}
        {blockType === "code" ? (
          <Select
            className="toolbar-item block-controls"
            onChange={onCodeLanguageSelect}
            options={codeLanguages}
            value={codeLanguage}
          />
        ) : (
          <>
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
              }}
              className={"toolbar-item spaced " + (isBold ? "active" : "")}
              aria-label="Format Bold"
            >
              <BoldIcon className="format" />
            </button>
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
              }}
              className={"toolbar-item spaced " + (isItalic ? "active" : "")}
              aria-label="Format Italics"
            >
              <ItalicIcon className="format" />
            </button>
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
              }}
              className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
              aria-label="Format Underline"
            >
              <UnderlineIcon className="format" />
            </button>
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
              }}
              className={
                "toolbar-item spaced " + (isStrikethrough ? "active" : "")
              }
              aria-label="Format Strikethrough"
            >
              <StrikethroughIcon className="format" />
            </button>
            <button
              onClick={insertLink}
              className={"toolbar-item spaced " + (isLink ? "active" : "")}
              aria-label="Insert Link"
            >
              <LinkIcon className="format" />
            </button>
            {isLink &&
              createPortal(
                <FloatingLinkEditor editor={editor} />,
                document.body
              )}

            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              }}
              className="toolbar-item spaced"
              aria-label="Left Align"
            >
              <LeftAlignIcon className="format" />
            </button>
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              }}
              className="toolbar-item spaced"
              aria-label="Center Align"
            >
              <CenterAlignIcon className="format" />
            </button>
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              }}
              className="toolbar-item spaced"
              aria-label="Right Align"
            >
              <RightAlignIcon className="format" />
            </button>
          </>
        )}
      </FlexContainer>
    </div>
  );
}
const LanguagesDropdown = styled.select`
  width: 6rem;
  padding: 0 0.25rem;
  margin-left: 0.35rem;
`;

const UnderlineIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/underline.svg");
`;

const BoldIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/bold.svg");
`;

const UndoIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/undo.svg");
`;

const RedoIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/redo.svg");
`;

const StrikethroughIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/strike-through.svg");
`;

const LinkIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/link.svg");
`;

const ItalicIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/italic.svg");
`;

const LeftAlignIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/left-align.svg");
`;

const RightAlignIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/right-align.svg");
`;

const CenterAlignIcon = styled.i`
  background-image: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/center-align.svg");
`;
