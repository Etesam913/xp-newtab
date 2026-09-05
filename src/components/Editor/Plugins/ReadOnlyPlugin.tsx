import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Fragment, useEffect } from "react";

function ReadOnlyPlugin({ isEditModeOn }: { isEditModeOn: boolean }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(isEditModeOn);
  }, [isEditModeOn, editor]);

  return <Fragment />;
}
export default ReadOnlyPlugin;
