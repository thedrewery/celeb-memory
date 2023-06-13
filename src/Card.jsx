const Card = ({ celebrity, isFlipped, isMatched, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-front">
        {/* Render the front of the card */}
      </div>
      <div className="card-back" onClick={onClick}>
        {/* Render the back of the card */}
      </div>
    </div>
  );
}

export default Card