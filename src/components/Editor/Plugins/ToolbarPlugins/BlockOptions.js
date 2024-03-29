import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";
import { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";

function BlockOptions() {
  return (
    <Fragment>
      <option value="normal" className="item">
        Normal
      </option>
      <option value="h1" className="item">
        Header 1
      </option>
      <option value="h2" className="item">
        Header 2
      </option>
      <option value="h3" className="item">
        Header 3
      </option>
      <option value="h4" className="item">
        Header 4
      </option>
      <option value="h5" className="item">
        Header 5
      </option>
      <option value="h6" className="item">
        Header 6
      </option>
      <option value="bulleted-list" className="item">
        Bullet List
      </option>
      <option value="numbered-list" className="item">
        Numbered List
      </option>
      <option value="code-block" className="item">
        Code Block
      </option>
    </Fragment>
  );
}

export function BlockOptionsDropdownList({ editor, blockType }) {
  const dropdownRef = useRef(null);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeader = (headerTag) => {
    if (blockType !== headerTag) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () =>
            $createHeadingNode(headerTag)
          );
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createCodeNode());
        }
      });
    }
  };

  // useEffect for blockType that modified selectIndex when blockType changes

  useEffect(() => {
    if (dropdownRef && dropdownRef.current) {
      const children = dropdownRef.current.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].value === blockTypeToBlockName[blockType]) {
          dropdownRef.current.selectedIndex = i + "";
        }
      }
    }
  }, [blockType, dropdownRef]);

  return (
    <Fragment>
      <BlockOptionsDropdown
        ref={dropdownRef}
        onChange={(e) => {
          if (e.target.value === "normal") formatParagraph();
          else if (e.target.value === "h1") formatHeader("h1");
          else if (e.target.value === "h2") formatHeader("h2");
          else if (e.target.value === "h3") formatHeader("h3");
          else if (e.target.value === "h4") formatHeader("h4");
          else if (e.target.value === "h5") formatHeader("h5");
          else if (e.target.value === "h6") formatHeader("h6");
          else if (e.target.value === "bulleted-list") formatBulletList();
          else if (e.target.value === "numbered-list") formatNumberedList();
          else if (e.target.value === "code-block") formatCode();
        }}
        aria-label="Formatting Options"
      >
        <BlockOptions />
      </BlockOptionsDropdown>
    </Fragment>
  );
}

const blockTypeToBlockName = {
  code: "code-block",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  ol: "numbered-list",
  ul: "bulleted-list",
  paragraph: "normal",
};

const BlockOptionsDropdown = styled.select`
  width: 6rem;
  padding: 0 0.25rem;
`;
