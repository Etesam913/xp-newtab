import type { ComponentProps, TextItem } from "../../types";
import { Fragment } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
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
import { DeleteButton } from "../../styles/StyledComponents";
import { handleDelete } from "../Window/helper";
import { FlexContainer } from "../../styles/Layout";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

function onError(error: Error) {
  throw error;
}

function Editor({ windowItem, windowObj }: ComponentProps<TextItem>) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  return (
    <Fragment>
      <LexicalComposer
        initialConfig={{
          namespace: "MyEditor",
          theme,
          editorState: windowItem.editorState ?? undefined,
          editable: isEditModeOn,
          onError,
          nodes: [
            HeadingNode,
            QuoteNode,
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
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
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
                windowItem["id"],
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
