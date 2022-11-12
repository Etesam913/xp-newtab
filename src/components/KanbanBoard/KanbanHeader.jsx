import styled, { css } from "styled-components";
import { useStore } from "../../Store";

function updateColumnHeader(text, id, columnHeaders, setColumnHeaders) {
  const copyOfColumnHeaders = { ...columnHeaders };
  copyOfColumnHeaders[id] = text;
  setColumnHeaders(copyOfColumnHeaders);
}

function KanbanHeader({ columnHeaders, id, setColumnHeaders, margin }) {
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  const settingsData = useStore((state) => state.settingsData);

  return (
    <HeaderContainer windowsOS={settingsData["windowsOS"]} margin={margin}>
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
  padding: 0.75rem 0.6rem 0.4rem;
  margin: ${(props) => props.margin};

  ${(props) =>
    props.windowsOS === 0 &&
    css`
      background-color: #f2eedc;
    `};

  ${(props) =>
    props.windowsOS === 1 &&
    css`
      background-color: #dddddd;
    `};
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
