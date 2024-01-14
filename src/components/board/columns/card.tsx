import { FC } from 'react';
import { Box, Badge, Avatar, chakra } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { CardDataType } from '../../../types/app.constants';

type Props = {
  showCardDetail: (cardId: string) => void;
  cardIndex: number;
  card: CardDataType;
};

const Card: FC<Props> = ({ cardIndex, showCardDetail, card }) => {
  const loadAssignedToUser = () => {
    return (
      <Box display="flex" justifyContent="flex-end">
        <Avatar size="xs" name={card.assignee || ""} />
      </Box>
    );
  };

  return (
    <Draggable draggableId={card.id} index={cardIndex} key={card.id}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          m="5px"
          p="10px"
          id={card.id}
          minHeight="80px"
          borderWidth="1px"
          bg="white"
          cursor="pointer"
          borderRadius="md"
          overflow="auto"
          _hover={{
            board: '1px solid',
            borderColor: '#edf2f7'
          }}
          onClick={() => showCardDetail(card.id)}>
          {card.label && card.label.map((l, index) => (
            <Badge key={index} ml="0.2rem" bg={l.color} color="white">
              {l.text}
            </Badge>
          ))}
          <chakra.p mt="0.4rem">{card.title}</chakra.p>
          {loadAssignedToUser()}
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
