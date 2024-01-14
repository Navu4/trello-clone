import { FC, useCallback, useRef, useState } from "react";
import {
  BoardColumnsDataType,
  CardDataType,
} from "../../../types/app.constants";
import {
  Box,
  Button,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { debounce } from "../../../utils";
import { GrDrag } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Cards from "./cards";
import { useAppDispatch as useDispatch } from "../../../store/hook";
import { v4 as uuid } from "uuid";
import { addCard } from "../../../store/app.slice";

interface BoardColumnsProps {
  column: BoardColumnsDataType;
  index: number;
  cards: CardDataType[];
  updateColumn: (data: BoardColumnsDataType) => void;
  deleteColumn: (columnId: string) => void;
  showCardDetail: (cardId: string) => void;
}

const BoardColumns: FC<BoardColumnsProps> = ({
  column,
  index,
  cards,
  updateColumn,
  deleteColumn,
  showCardDetail
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLDivElement | null>(null); 
  const [showTitleInput, setShowTitleInput] = useBoolean();
  const [showEditBox, setEditBoxVisibility] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>(column.name || "");
  const [newCardTitle, setNewCardTitle] = useState<string>("");

  const cardsInSortedSequence = cards.sort(
    (cardA: CardDataType, cardB: CardDataType) =>
      cardA.sequence - cardB.sequence
  );

  const handleChange = (e: any) => {
    setColumnName(e.target.value);
    handleColumnNameChange(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setEditBoxVisibility(false);
    }
  };

  const handleCardTitleKeyDown = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey != true) {
      e.preventDefault();
      setShowTitleInput.toggle();

      dispatch(addCard({  columnId : column.id, cardId : uuid(), cardTitle : newCardTitle, }))
      setNewCardTitle("");
    }
  };

  const handleColumnNameChange = useCallback(
    debounce((value: string) => nameChange(value), 800),
    []
  );

  const nameChange = async (value: string) => {
    const data: BoardColumnsDataType = {
      ...column,
      name: value,
    };

    updateColumn(data);
  };

  const handleColumnDelete = () => {
    deleteColumn(column.id);
  };

  // const handleCardAdd = () => dispatch(addCard({ columnId : column.id, cardId: uuid() }));
  const handleCardAdd = () => {
    setShowTitleInput.toggle();
    setTimeout(() => inputRef.current?.focus(), 1000)
  };

  const handleNewCardTitle = (e: any) => {
    setNewCardTitle(e.target.value);
  };

  const loadColumnTitle = () => {
    if (showEditBox) {
      return (
        <Input
          bg="white"
          value={columnName}
          size="xs"
          width="60%"
          ml="20px"
          onChange={handleChange}
          onBlur={() => setEditBoxVisibility(false)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <Heading as="h6" size="sm" ml="10px" mt="5px" textAlign="center">
        <Box display="flex">
          <GrDrag /> {columnName || "Untitled"}
        </Box>
      </Heading>
    );
  };
  return (
    <Draggable draggableId={column.id} index={index} key={column.id}>
      {(provided) => (
        <Box
          key={index}
          overflowY="auto"
          mt="10px"
          mx="10px"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box key={index} width="272px" overflowY="auto" mt="10px" mx="10px">
            <Box
              bg={column.name === "addColumn" ? "" : "#F0F0F0"}
              pb="5px"
              rounded="lg"

              id={column.id}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {loadColumnTitle()}
                <Box my="10px" mr="10px" cursor="grab" display="flex">
                  <Menu>
                    <MenuButton aria-label="Options">
                      <FiMoreHorizontal />
                    </MenuButton>
                    <MenuList justifyContent="center" alignItems="center">
                      <MenuItem
                        onClick={() => setEditBoxVisibility(!showEditBox)}
                      >
                        <AiOutlineEdit />
                        <Text marginLeft="5px">Edit</Text>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={handleColumnDelete}>
                        <AiOutlineDelete />
                        <Text marginLeft="5px">Delete</Text>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
              <Droppable droppableId={column.id} type="card">
                {(provided) => (
                  // 2px height is needed to make the drop work when there is no card.
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    minHeight="2px"
                  >
                    <Cards
                      showCardDetail={showCardDetail}
                      cards={cardsInSortedSequence}
                    />
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
              {showTitleInput && (
                <Box
                  ref={inputRef}
                  as="textarea"
                  id="newCardInputElement"
                  m="0.5rem"
                  p="0.4rem"
                  w={"94%"}
                  minHeight="80px"
                  borderWidth="1px"
                  bg="white"
                  borderRadius="md"
                  overflow="auto"
                  placeholder="Enter a title for this card..."
                  fontSize={"0.8rem"}
                  value={newCardTitle}
                  onChange={handleNewCardTitle}
                  onBlur={function(){
                    setShowTitleInput.toggle()
                    setNewCardTitle("");
                  }}
                  onKeyDown={handleCardTitleKeyDown}
                ></Box>
              )}
              <Button
                size="xs"
                my="10px"
                mx="auto"
                width="80%"
                isDisabled={showTitleInput}
                className="add-new-card"
                data-btn-col={column.id}
                color="black"
                variant="ghost"
                display="flex"
                loadingText="Adding card"
                onClick={handleCardAdd}
              >
                + Add a card
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default BoardColumns;
