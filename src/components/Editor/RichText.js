import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { changeItemProperty } from "../Window/helper";
import { useStore } from "../../Store";
import { useRef } from "react";

function RichText({ windowItem, windowObj }) {
  const [editor] = useLexicalComposerContext();
  const richTextContainerRef = useRef(null);
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  return (
    <div
      ref={richTextContainerRef}
      onFocus={() =>
        changeItemProperty(
          windowObj,
          windowData,
          setWindowData,
          windowItem,
          "editorState",
          JSON.stringify(editor.getEditorState())
        )
      }
      onBlur={() =>
        changeItemProperty(
          windowObj,
          windowData,
          setWindowData,
          windowItem,
          "editorState",
          JSON.stringify(editor.getEditorState())
        )
      }
    >
      <RichTextPlugin
        contentEditable={<ContentEditable className="rich-text-editor" />}
        placeholder=""
      />
    </div>
  );
}
export default RichText;
