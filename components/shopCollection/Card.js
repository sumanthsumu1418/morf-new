const Card = (props) => {
  return (
    <div className="hero-card">
      <div className="">
        <div className="hero-card-image">
          <img src={props.src} alt={props.src} />
        </div>

        <div className="hero-card-description">
          <h1>{props.title}</h1>
          <div className="hero-card-description-hr"></div>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
