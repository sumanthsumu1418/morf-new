import Link from "next/link";

const CustomiserHeader = () => {
  return (
    <header className="cHeader">
      <div className="cHeader__logo">
        <Link href="/">
          <a className="morf">
            <img src="/icons/morf.svg" alt="morf-logo" />
          </a>
        </Link>
      </div>

      <div className="cHeader__btns">
        <div className="cHeader__btns--btn">
          <img className="icon" src="/icons/cExit.svg" alt="Exit" />
          <p className="text">EXIT</p>
        </div>
        <div className="cHeader__btns--btn">
          <img className="icon" src="/icons/cBookmark.svg" alt="Exit" />
          <p className="text">BOOKMARK</p>
        </div>
        <div className="cHeader__btns--btn">
          <img className="icon" src="/icons/cShare.svg" alt="Exit" />
          <p className="text">SHARE</p>
        </div>
        <div className="cHeader__btns--btn">
          <img className="icon" src="/icons/cAddToCart.svg" alt="Exit" />
          <p className="text">ADD TO CART</p>
        </div>
      </div>
    </header>
  );
};

export default CustomiserHeader;
