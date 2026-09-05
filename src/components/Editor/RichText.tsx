import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { ComponentProps, TextItem } from "../../types";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { changeItemProperty } from "../Window/helper";
import { useStore } from "../../Store";

function RichText({ windowItem, windowObj }: ComponentProps<TextItem>) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (
      windowItem.editorState &&
      windowItem.editorState !==
        JSON.stringify(editor.getEditorState().toJSON())
    ) {
      editor.setEditorState(editor.parseEditorState(windowItem.editorState), {
        tag: "external-sync",
      });
    }
  }, [editor, windowItem.editorState]);
  const setWindowData = useStore((state) => state.setWindowData);
  return (
    <>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-label="Note text"
            className="rich-text-editor"
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin
        ignoreSelectionChange
        onChange={(editorState, _editor, tags) => {
          if (tags.has("external-sync")) return;
          changeItemProperty(
            windowObj,
            [],
            setWindowData,
            windowItem,
            "editorState",
            JSON.stringify(editorState.toJSON()),
          );
        }}
      />
    </>
  );
}
export default RichText;
