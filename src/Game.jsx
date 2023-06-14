import Board from "./Board"

function Game() {
  // Game state and logic here
  
  return (
    <div className="game">
      {/* Render game elements */}
      <Board cards={cards} handleCardClick={handleCardClick} />
    </div>
  );
}

export default Game;