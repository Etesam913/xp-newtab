import { $getRoot, $getSelection } from "lexical";
import { Fragment, useCallback, useMemo, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import theme from "./Theme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import ToolbarPlugins from "./Plugins/ToolbarPlugins";
import { changeItemProperty } from "../Window/helper";
import { useStore } from "../../Store";
import ReadOnlyPlugin from "./Plugins/ReadOnlyPlugin";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function Editor({ windowItem, windowObj }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const isEditModeOn = useStore((state) => state.isEditModeOn);

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

  return useMemo(() => {
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
        <RichTextPlugin
          contentEditable={<ContentEditable className="rich-text-editor" />}
          placeholder={<div>Enter text above</div>}
        />
        <OnChangePlugin
          ignoreInitialChange={true}
          ignoreSelectionChange={true}
          onChange={(editorState) =>
            changeItemProperty(
              windowObj,
              windowData,
              setWindowData,
              windowItem,
              "editorState",
              JSON.stringify(editorState)
            )
          }
        />
        <LinkPlugin />
        <ListPlugin />
        <ReadOnlyPlugin isEditModeOn={isEditModeOn} />
        <AutoLinkPlugin matchers={MATCHERS} />
        <CodeHighlightPlugin />
        <HistoryPlugin />
      </LexicalComposer>
    );
  }, [isEditModeOn]);
}

export default Editor;
