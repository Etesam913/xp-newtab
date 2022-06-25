import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Fragment, useEffect } from "react";

function ReadOnlyPlugin({ isEditModeOn }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    console.log(isEditModeOn);
    editor.setReadOnly(!isEditModeOn);
  }, [isEditModeOn]);

  return <Fragment />;
}
export default ReadOnlyPlugin;
