import Button from "../Button";

const GroomsMen = () => {
  return (
    <div className="groomsmen-">
      <div className="groomsmen-heading">
        <h1> Groomsmen </h1>

        <div className="groomsmen-intro">
          <div className="groomsmen-intro-101">
            {" "}
            101{" "}
            <p style={{}}>
              Get your Groom Squad game on point with custom shoes for each{" "}
              <br /> of your groomsmen.
            </p>
          </div>{" "}
          <Button className="groomsmen-btn" action="Find Out How" />
        </div>
      </div>
      <div className="groomsmen-image">
        <img src="/images/homepageImg/groomsmen-img.jpg" alt="" />
      </div>
    </div>
  );
};

export default GroomsMen;
