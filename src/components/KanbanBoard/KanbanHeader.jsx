import styled from "styled-components";
import { useStore } from "../../Store";
import { Fragment } from "react";

function updateColumnHeader(text, id, columnHeaders, setColumnHeaders) {
  const copyOfColumnHeaders = { ...columnHeaders };
  copyOfColumnHeaders[id] = text;
  setColumnHeaders(copyOfColumnHeaders);
}

function KanbanHeader({ columnHeaders, id, setColumnHeaders, margin }) {
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  return (
    <HeaderContainer margin={margin}>
      {isEditModeOn ? (
        <KanbanTitleInput
          type="text"
          maxLength={80}
          value={columnHeaders[id]}
          onChange={(e) =>
            updateColumnHeader(
              e.target.value,
              id,
              columnHeaders,
              setColumnHeaders
            )
          }
        />
      ) : (
        <KanbanTitle>{columnHeaders[id]}</KanbanTitle>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  background-color: #f2eedc;
  padding: 0.4rem 0.6rem;
  margin: ${(props) => props.margin};
  border-radius: 0.15rem 0.15rem 0 0;
`;

const KanbanTitle = styled.h2`
  font-size: 0.9rem;
  margin: 0;
`;

const KanbanTitleInput = styled.input`
  color: black !important;
  font-size: 0.9rem;
  width: 100%;
  padding: 0 0 0 3px !important;
`;

export default KanbanHeader;
