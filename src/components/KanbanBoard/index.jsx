import React from "react";
import styled from "styled-components";

function KanbanBoard() {
  return (
    <ColumnContainer>
      <KanbanColumn>
        <KanbanItem>🚛</KanbanItem>
        <KanbanItem>🚞</KanbanItem>
      </KanbanColumn>

      <KanbanColumn>
        <KanbanItem>🍌</KanbanItem>
        <KanbanItem>🦖</KanbanItem>
      </KanbanColumn>
      <KanbanColumn>
        <KanbanItem>🫐</KanbanItem>
        <KanbanItem>🥹</KanbanItem>
      </KanbanColumn>
    </ColumnContainer>
  );
}

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const KanbanColumn = styled.div`
  padding: 0.5rem;
`;

const KanbanItem = styled.div``;

export default KanbanBoard;
