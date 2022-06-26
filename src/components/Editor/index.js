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

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}
// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function Editor({ windowItem, windowObj }) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const URL_MATCHER =
    /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  console.log("rerender");
  return (
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
  );
}

export default Editor;
