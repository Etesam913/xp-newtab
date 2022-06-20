import React from "react";
import styled from "styled-components";
import { format } from "./helper";

function Editor() {
  return (
    <div>
      <FormattingRow>
        <FormattingButton onClick={() => format("bold")}>Bold</FormattingButton>
        <FormattingButton onClick={() => format("italic")}>
          Italicize
        </FormattingButton>
      </FormattingRow>

      <div contentEditable={true} />
    </div>
  );
}

const FormattingButton = styled.button`
  min-width: 0 !important;
  min-height: 0 !important;
  padding: 0.25rem 0.35rem;
  margin-right: 0.5rem;
`;

const FormattingRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export default Editor;
