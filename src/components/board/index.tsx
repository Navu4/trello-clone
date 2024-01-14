import { Box, useDisclosure } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { BoardColumnsDataType, CardDataType } from "../../types/app.constants";
import { useEffect, useState } from "react";
import AddColumnButton from "./columns/buttons/add-column-button";
import { v4 as uuid } from "uuid";
import BoardColumns from "./columns";
import {
  addColumnToBoard,
  deleteColumnFromBoard,
  updateCardSequenceToLocalState,
  updateColumnFromBoard,
  updateColumnSequenceToLocalState,
} from "../../store/app.slice";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import CardDetailsModal from "./columns/modals/card-details-modal";

export default function BoardSection() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnsData = useAppSelector((state) => state.appReducer.columns);
  const cardsData = useAppSelector((state) => state.appReducer.cards);
  const [cardDetail, setCardDetail] = useState<CardDataType>();
  const [columns, setColumns] = useState<BoardColumnsDataType[]>([]);
  const [cards, setCards] = useState<CardDataType[]>([]);

  const addColumnHandler = () =>
    dispatch(
      addColumnToBoard({
        column: { id: uuid(), name: null, sequence: columnsData.length },
      })
    );
  const updateColumn = (column: BoardColumnsDataType) =>
    dispatch(updateColumnFromBoard({ column }));

  const deleteColumn = (columnId: string) =>
    dispatch(deleteColumnFromBoard({ columnId }));

  const showCardDetail = (cardId: string) => {
    const card = cards.filter((card) => card.id === cardId);

    setCardDetail(card[0]);
    onOpen();
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return; // Don't do anything where there is not destination
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; // Do nothing if the card is put back where it was
    if (type === "column")
      await saveColumnSequence(source.index, destination.index); // If column is being dragged
    if (type === "card")
      await saveCardSequence(source, destination, draggableId); // If card is being dragged
  };

  const saveCardSequence = async (
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string
  ) => {  
    const { droppableId: sourceColumnId, index: sourceIndex } = source;
    const { droppableId: destinationColumnId, index: destinationIndex } = destination;
  
    const selectedCardIndex = cards.findIndex((card) => card.id === draggableId);
    const selectedCard = { ...cards[selectedCardIndex], columnId: destinationColumnId, sequence : destinationIndex };
  
    let updatedCards;
  
    if (sourceColumnId === destinationColumnId) {
      let cardsFromSourceColToDestCol = [...cards].filter((card) => card.columnId === sourceColumnId);
      const [reorderedItem] = cardsFromSourceColToDestCol.splice(sourceIndex, 1);
      cardsFromSourceColToDestCol.splice(destinationIndex, 0, reorderedItem);
  
      updatedCards = cards.map((col) => (
        col.columnId === sourceColumnId
          ? { ...col, sequence: cardsFromSourceColToDestCol.findIndex(c => c.id === col.id) }
          : col
      ));

      cardsFromSourceColToDestCol = cardsFromSourceColToDestCol.map(
        (col, index) => {
          return { ...col, sequence: index };
        }
      );

      let cardsFromOtherCol = cards.filter(
        (card) => card.columnId !== sourceColumnId
      );

      updatedCards = [...cardsFromOtherCol, ...cardsFromSourceColToDestCol]
    } else {
      const cardsFromSourceCol = cards
        .filter((card) => card.columnId === sourceColumnId && card.id !== draggableId)
        .sort((a, b) => a.sequence - b.sequence)
        .map((card, index) => ({ ...card, sequence: index }));
  
      let cardsFromDestinationCol = cards
        .filter((card) => card.columnId === destinationColumnId)
        .sort((a, b) => a.sequence - b.sequence);
  
      cardsFromDestinationCol.splice(destinationIndex, 0, selectedCard);
      cardsFromDestinationCol = cardsFromDestinationCol.map((card, index) => ({ ...card, sequence: index }));

      updatedCards = [
        ...cardsFromSourceCol,
        ...cardsFromDestinationCol,
        ...cards.filter((card) => card.columnId !== sourceColumnId && card.columnId !== destinationColumnId),
      ];
    }
  
    dispatch(updateCardSequenceToLocalState({ cards: updatedCards }));
  };
  
  const saveColumnSequence = async (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    // Remove the column which is dragged from the list
    let columnsInfo = Array.from(columnsData);
    const [reorderedItem] = columnsInfo.splice(sourceIndex, 1);
    columnsInfo.splice(destinationIndex, 0, reorderedItem);
    columnsInfo = columnsInfo.map((col, index) => {
      return { ...col, sequence: index };
    });

    dispatch(updateColumnSequenceToLocalState({ columns: columnsInfo }));
  };

  useEffect(() => {
    setColumns(columnsData || []);
    setCards(cardsData || []);
  }, [columnsData, cardsData]);
  return (
    <Box
      display="block"
      position="relative"
      height="100vh"
      overflowX="auto"
      pt={"65px"}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-collumns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="flex"
              position="absolute"
              overflowY="auto"
              h={"calc(100vh - 80px)"}
            >
              {columns.map((column, index) => {
                const cardsData = cards.filter(
                  (card) => card.columnId == column.id
                );
                return (
                  <BoardColumns
                    key={column.id}
                    column={column}
                    index={index}
                    cards={cardsData}
                    updateColumn={updateColumn}
                    deleteColumn={deleteColumn}
                    showCardDetail={showCardDetail}
                  />
                );
              })}
              {provided.placeholder}
              <AddColumnButton addColumn={addColumnHandler} />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {isOpen && cardDetail && (
        <CardDetailsModal isOpen={isOpen} onClose={onClose} card={cardDetail} />
      )}
    </Box>
  );
}
