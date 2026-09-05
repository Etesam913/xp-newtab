import type { ColumnHeaders, Setter } from "../../types";
import type { StyleProps } from "../../types";
import styled, { css } from "styled-components";
import { useStore } from "../../Store";

function updateColumnHeader(
  text: string,
  id: string,
  columnHeaders: ColumnHeaders,
  setColumnHeaders: Setter<ColumnHeaders>,
) {
  const copyOfColumnHeaders = { ...columnHeaders };
  copyOfColumnHeaders[id] = text;
  setColumnHeaders(copyOfColumnHeaders);
}

function KanbanHeader({
  columnHeaders,
  id,
  setColumnHeaders,
  margin,
}: {
  columnHeaders: ColumnHeaders;
  id: string;
  setColumnHeaders: Setter<ColumnHeaders>;
  margin: string;
}) {
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
              setColumnHeaders,
            )
          }
        />
      ) : (
        <KanbanTitle>{columnHeaders[id]}</KanbanTitle>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<StyleProps>`
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

  ${(props) =>
    props.windowsOS === 2 &&
    css`
      background-color: #cbebf6;
    `};
`;

const KanbanTitle = styled.h2<StyleProps>`
  font-size: 0.9rem;
  margin: 0;
`;

const KanbanTitleInput = styled.input<StyleProps>`
  color: black !important;
  font-size: 0.9rem;
  width: 100%;
  padding: 0 0 0 3px !important;
`;

export default KanbanHeader;
