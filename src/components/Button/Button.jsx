import "./Button.css";

const Button = ({ text, onClick, type, disabled = false }) => {
  return (
    <>
      {disabled ? (
        <button disabled className={`btn ${type}`} onClick={onClick}>
          {text}
        </button>
      ) : (
        <button className={`btn ${type}`} onClick={onClick}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
