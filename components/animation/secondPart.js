import React, { useState, useEffect, useMemo } from "react";

import data from "../../lib/data";
import Card from "@/components/shopCollection/Card";
import BestPicks from "../secondSection/BestPicks";
import GroomsMen from "../../components/thirdSection/GroomsMen";
import Footer from "../shared/Footer";
import MorfJourney from "../fifthSection/MorfJourney";
import PerfectFitCarousel from "../fourthSection/PerfectFitCarousel";

function SecondPart({ columns }) {
  // useEffect(() => {
  //   const Masonry = require("masonry-layout");
  //   const grid = document.querySelector(".grid");

  //   let mes = new Masonry(grid, {
  //     horizontalOrder: true,
  //     itemSelector: ".grid-item",
  //     gutter: ".gutter",
  //     transitionDuration: 0.8,
  //     percentPosition: true,
  //   });
  // }, []);
  // useEffect(() => {
  //   const Masonry = require("masonry-layout");
  //   const grid = document.querySelector(".grid");
  //   setTimeout(() => {
  //     let mes = new Masonry(grid, {
  //       horizontalOrder: true,
  //       itemSelector: ".grid-item",
  //       gutter: ".gutter",
  //       transitionDuration: 0.8,
  //       percentPosition: true,
  //     });
  //   }, 800);
  // }, [columns]);
  return (
    <>
      <div
        className="list second"
        style={{ width: "100%", padding: "0px 30px" }}
      >
        <h1 className="shop-collection-heading">Shop Collection</h1>

        <div className="grid" style={{ width: "100%", paddingBottom: "100px" }}>
          <div className="gutter"></div>
          {data.map((card) => {
            return (
              <div
                key={card.title}
                className={`grid-item slowTransition ${
                  columns === 3 ? "active" : ""
                }`}
              >
                <Card
                  src={card.src}
                  title={card.title}
                  description={card.description}
                />
              </div>
            );
          })}
        </div>
        <BestPicks columns={columns} />
        <GroomsMen />

        <PerfectFitCarousel />

        <MorfJourney />

        <Footer />
      </div>
    </>
  );
}

export default SecondPart;
