import Textlabel from "./labels/Textlabel";
import ColorChoose from "./labels/ColorChoose";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ItemFilter = ({
  showInRange,
  sortBy,
  currCategories,
  removeCategory,
  clearFilter,
}) => {
  function valuetext(value) {
    return `${value}°C`;
  }

  const [value, setValue] = React.useState([0, 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    showInRange(newValue);
  };
  const [selectedColor, setSelectedColor] = React.useState("");
  return (
    <div className="itemFilter">
      <div className="categorySelector">CATEGORY ^</div>
      <div className="categoryEventsHeading">EVENTS</div>
      <div className="categoryFilterByHeading">FILTER BY</div>
      <div className="categorySaleHeading">SALE</div>
      <div className="categorySaleHeading">STYLE</div>
      <Textlabel text="Oxford" />
      {/* <div className="categorySaleHeading">DECORATION</div>
      <Textlabel text="BROGUE" />
      <Textlabel text="CAP TOE" />
      <Textlabel text="HALF BROGUE" /> */}
      <div className="categorySaleHeading">CATEGORY</div>
      {currCategories.map((category) => (
        <Textlabel text={category} removeCategory={removeCategory} />
      ))}
      <Textlabel text={"All"} removeCategory={clearFilter} />

      <div className="categorySaleHeading">MATERIAL</div>
      <div className="materialType">All</div>
      <div className="categorySaleHeading">PRICE</div>
      <div className="SLIDER">
        {" "}
        <Box sx={{ width: 300, padding: 2 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={10000}
          />
        </Box>
      </div>
      <div className="categorySaleHeading">COLOR</div>
      <div className="colorTemplate">
        <ColorChoose
          color="red"
          setSelectedColor={setSelectedColor}
          currColor={selectedColor}
        />
        <ColorChoose
          color="grey"
          setSelectedColor={setSelectedColor}
          currColor={selectedColor}
        />
        <ColorChoose
          color="brown"
          setSelectedColor={setSelectedColor}
          currColor={selectedColor}
        />
        <ColorChoose
          color="green"
          setSelectedColor={setSelectedColor}
          currColor={selectedColor}
        />
      </div>
      <div className="categorySaleHeading">SORT BY</div>
      <div className="sortByDiv" role="button">
        <div
          className="sortByType sortByTypeSelected"
          onClick={() => sortBy("LtoH")}
          role="button"
        >
          Price ( Low to High )
        </div>
        <div className="sortByType typeHover" onClick={() => sortBy("HtoL")}>
          Price ( High to Low )
        </div>
        <div className="sortByType" onClick={() => sortBy("OtoN")}>
          Oldest to Newest
        </div>
        <div className="sortByType" onClick={() => sortBy("NtoO")}>
          Newest to Oldest
        </div>
        <div className="sortByType">Best Selling</div>
      </div>
    </div>
  );
};

export default ItemFilter;
