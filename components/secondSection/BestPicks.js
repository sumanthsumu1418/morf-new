import { useEffect } from "react";
import Button from "../Button";
import ProductCard from "./ProductCard";
import productData from "../../lib/productData";

const BestPicks = ({ columns }) => {
  // useEffect(() => {
  //   const Masonry = require("masonry-layout");
  //   const grid = document.querySelector(".grid2");

  //   let mes = new Masonry(grid, {
  //     horizontalOrder: true,
  //     itemSelector: ".grid-item2",
  //     gutter: ".gutter2",
  //     transitionDuration: 0.8,
  //     percentPosition: true,
  //   });
  // }, []);
  // useEffect(() => {
  //   const Masonry = require("masonry-layout");
  //   const grid = document.querySelector(".grid2");
  //   setTimeout(() => {
  //     let mes = new Masonry(grid, {
  //       horizontalOrder: true,
  //       itemSelector: ".grid-item2",
  //       gutter: ".gutter2",
  //       transitionDuration: 0.8,
  //       percentPosition: true,
  //     });
  //   }, 800);
  // }, [columns]);

  return (
    <div
      style={{
        width: "100%",
        // margin: "0px 30px",
        height: "100%",
      }}
      className="best-pick-container"
    >
      <div className="morf-best-pick">
        <h1>Morf Best Picks </h1>
      </div>

      <div
        className="grid2"
        style={
          {
            // margin: "0px 30px 20px 30px",
          }
        }
      >
        <div className="gutter2"></div>
        {productData.map((pData) => {
          return (
            <div
              key={pData.id}
              className={`grid-item2 slowTransition ${
                columns === 3 ? "active" : ""
              }`}
            >
              {pData.type === "product" ? (
                <ProductCard {...pData} />
              ) : (
                <div className="product-data-text">{pData.text}</div>
              )}
            </div>
          );
        })}
      </div>
      <Button className="product-view-more" action="View More" />
    </div>
  );
};

export default BestPicks;
