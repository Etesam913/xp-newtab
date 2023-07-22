import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Fragment, useEffect } from "react";

function ReadOnlyPlugin({ isEditModeOn }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setReadOnly(!isEditModeOn);
  }, [isEditModeOn, editor]);

  return <Fragment />;
}
export default ReadOnlyPlugin;
