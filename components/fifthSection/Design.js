import Link from "next/link";

const Design = () => {
  return (
    <div className="start-design">
      <div className="start-design-header">
        <span className="start-design-header-title">Start Designing</span>
        <span className="start-design-header-subtitle">
          by choosing your base modal{" "}
        </span>
      </div>

      <div className="start-design-body">
        <div className="start-design-body-first">
          <Link href="#">
            <a>
              <img src="/images/homepageImg/Shoe_pair_round.jpg" alt="" />
            </a>
          </Link>
          <h3> Round </h3>
        </div>

        <div className="start-design-body-second">
          <Link href="#">
            <a>
              <img src="/images/homepageImg/shoe_pair_almond.jpg" alt="" />
            </a>
          </Link>
          <h3>Almond</h3>
        </div>

        <div className="start-design-body-third">
          <Link href="#">
            <a>
              <img src="/images/homepageImg/shoe_pair_square.jpg" alt="" />
            </a>
          </Link>
          <h3>Square</h3>
        </div>
      </div>
    </div>
  );
};

export default Design;
