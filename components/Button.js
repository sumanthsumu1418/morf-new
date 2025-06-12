const Button = (props) => {
  const { className, onClick } = props;

  const handleButtonClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`common-btn-style ${className}`}
    >
      <span> {props.action} </span>
    </button>
  );
};

export default Button;
