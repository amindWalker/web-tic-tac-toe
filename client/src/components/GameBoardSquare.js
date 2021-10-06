const GameBoardSquare = (props) => (
  <div className="game-board-square" {...props}>
    {props.player ? 'X' : props.computer ? 'O' : ''}
  </div>
)

export default GameBoardSquare
