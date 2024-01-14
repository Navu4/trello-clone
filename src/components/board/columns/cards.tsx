import { FC } from 'react';
import { CardDataType } from '../../../types/app.constants';
import Card from './card';

type Props = {
  cards: CardDataType[];
  showCardDetail: (cardId: string) => void;
};

const Cards: FC<Props> = ({ cards, showCardDetail }) => {
  return (
    <>
      {cards?.map((card, index) => (
        <Card key={card.id} card={card} cardIndex={index} showCardDetail={showCardDetail} />
      ))}
    </>
  );
};

export default Cards;
