import { Fragment, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import theme from "./Theme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import ToolbarPlugins from "./Plugins/ToolbarPlugins";
import { useStore } from "../../Store";
import ReadOnlyPlugin from "./Plugins/ReadOnlyPlugin";
import RichText from "./RichText";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DeleteButton } from "../../styles/StyledComponents";
import { handleDelete } from "../Window/helper";
import { FlexContainer } from "../../styles/Layout";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function Editor({ windowItem, windowObj }) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  return (
    <Fragment>
      <LexicalComposer
        initialConfig={{
          namespace: "MyEditor",
          theme,
          editorState: windowItem["editorState"],
          onError,
          nodes: [
            HeadingNode,
            CodeHighlightNode,
            CodeNode,
            LinkNode,
            AutoLinkNode,
            ListNode,
            ListItemNode,
          ],
        }}
      >
        {isEditModeOn ? <ToolbarPlugins /> : <Fragment />}
        <RichText windowItem={windowItem} windowObj={windowObj} />
        <LinkPlugin />
        <ListPlugin />
        <ReadOnlyPlugin isEditModeOn={isEditModeOn} />
        <CodeHighlightPlugin />
        <HistoryPlugin />
      </LexicalComposer>
      {isEditModeOn && (
        <FlexContainer justifyContent="center">
          <DeleteButton
            margin={"0.5rem 0 0"}
            onClick={() => {
              handleDelete(
                windowData,
                setWindowData,
                windowObj,
                windowItem["id"]
              );
            }}
          >
            Delete
          </DeleteButton>
        </FlexContainer>
      )}
    </Fragment>
  );
}

export default Editor;
