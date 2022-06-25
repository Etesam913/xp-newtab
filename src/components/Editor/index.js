import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import theme from "./Theme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Index from "./Plugins/ToolbarPlugins";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    /*console.log(root, selection);*/
  });
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

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
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
  };

  const URL_MATCHER =
    /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const MATCHERS = [
    (text) => {
      const match = URL_MATCHER.exec(text);
      return (
        match && {
          index: match.index,
          length: match[0].length,
          text: match[0],
          url: match[0],
        }
      );
    },
  ];

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Index />
      <RichTextPlugin
        contentEditable={<ContentEditable className="rich-text-editor" />}
        placeholder={<div>Enter text above</div>}
      />
      <LinkPlugin />
      <ListPlugin />
      <AutoLinkPlugin matchers={MATCHERS} />
      <CodeHighlightPlugin />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
}

export default Editor;
