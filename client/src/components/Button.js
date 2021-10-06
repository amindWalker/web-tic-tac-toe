// New Game Button for the game using Bootstrap
const Button = (props) => {
  return (
    <button
      className="btn btn-primary btn-lg btn-block"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button
