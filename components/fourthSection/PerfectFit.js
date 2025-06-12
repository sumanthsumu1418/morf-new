import Button from "components/Button";
const PerfectFit = () => {
  return (
    <div className="perfect-fit">
      <div className="perfect-fit-image">
        <img src="/images/homepageImg/hand.svg" alt="" />
      </div>

      <div className="perfect-fit-description">
        <h1> Find Your Perfect Fit </h1>
        <p style={{}}>
          We use a 3D measurement tool designed for you to virtually find your
          perfect footwear size from the comfort of your home. A first of its
          kind, this brand new technology means you get sneakers guaranteed to
          fit. Sixty percent of people are wearing the wrong size and you don’t
          have to be one of them. So give it a try!
        </p>
        <Button className="perfect-fit-button" action="Find Your Fit" />
      </div>
    </div>
  );
};

export default PerfectFit;
