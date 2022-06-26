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
      <option value="large-heading" className="item">
        Large Heading
      </option>
      <option value="small-heading" className="item">
        Small Heading
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

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode("h1"));
        }
      });
    }
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode("h2"));
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
    console.log(blockType, blockTypeToBlockName[blockType]);
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
          else if (e.target.value === "large-heading") formatLargeHeading();
          else if (e.target.value === "small-heading") formatSmallHeading();
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
  h1: "large-heading",
  h2: "small-heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "numbered-list",
  ul: "bulleted-list",
  paragraph: "normal",
};

const BlockOptionsDropdown = styled.select`
  width: 6rem;
  padding: 0 0.25rem;
`;
