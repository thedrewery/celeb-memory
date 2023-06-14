import Card from "./Card"

const Board = ({ cards, handleCardClick }) => {


    
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          celebrity={card.celebrity}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}

export default Board;