import { useState, useRef, useEffect } from "react";
import {
  modelsData,
  modelsPartsData,
  decorationsTypeData,
  decorationsTypeDataWithPatina,
  rotationData,
} from "lib/data";
import BtnSlider from "./BtnSlider";
import BaseModel from "../baseModel";
import ModelStyle from "../modelStyle";
import Decoration from "../decoration";
import Patina from "../patina";
import CapToe from "../capToe";
import Counter from "../counter";
import WingTip from "../wingTip";
import Vamp from "../vamp";
import Apron from "../apron";
import Laces from "../laces";
import Upper from "../upper";
import Quarter from "../quarter";
import Tassel from "../tassel";
import Binding from "../binding";
import Saddle from "../saddle";
import Size from "../Size";
import Sole from "../sole";
import Width from "../Width";
import SoleEngraving from "../soleEngraving";
import Stitching from "../stitching";
import FullGrain from "../fullGrain";
import PatinaSuede from "../patinaSuede";

const custMobOptions = [
  {
    id: 1,
    title: "MODEL",
  },
  {
    id: 2,
    title: "STYLE",
  },
  {
    id: 3,
    title: "DECORATION",
  },
  {
    id: 4,
    title: "PATINA",
  },

  {
    id: 5,
    title: "COLOUR/MATERIAL",
  },

  {
    id: 6,
    title: "SIZE",
  },

  {
    id: 7,
    title: "WIDTH",
  },

  {
    id: 8,
    title: "ENGRAVING",
  },
];

const MobileAcc = ({
  state,
  setState,
  mainIndex,
  setIndex,
  handleBaseModelClick,
  handleOptionClick,
  openOption,
  slideIndex,
  setSlideIndex,
  currentMaterial,
  setCurrentMaterial,
  setOpenOption,
  slideHeight,
  setSlideHeight,
  engraveAdded,
  setEngraveAdded,
  SizeError,
  handleFullGrainClick,
  handleSuedeClick,
}) => {
  const handleMaterialClick = (tab) => {
    setIndex(tab);
    setCurrentMaterial(tab);

    // setCurrentSeleted(() => tab);
  };

  const nextSlide = () => {
    setOpenOption(true);
    if (slideIndex !== custMobOptions.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === custMobOptions.length) {
      setSlideIndex(1);
    }
  };

  const PrevSlide = () => {
    setOpenOption(true);
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(custMobOptions.length);
    }
  };

  useEffect(() => {
    if (slideIndex === 1) {
      setOpenOption(true);

      if (window.innerWidth <= 600) {
        setSlideHeight(`${148}px`);
      } else {
        setSlideHeight(`${185}px`);
      }
    }
    if (slideIndex === 2 || slideIndex === 3) {
      if (window.innerWidth <= 600) {
        setSlideHeight(`${140}px`);
      } else {
        setSlideHeight(`${167}px`);
      }
    }

    if (slideIndex === 4) {
      if (window.innerWidth <= 600) {
        setSlideHeight(`${227}px`);
      } else {
        setSlideHeight(`${255}px`);
      }

      // setSlideHeight(`${227}px`);
    }

    if (slideIndex === 5) {
      // setSlideHeight(`${420}px`);
      if (state.currentPatina === "with_patina") {
        setIndex("FULLGRAIN");
        setCurrentMaterial("FULLGRAIN");
      } else {
        setIndex("VAMP");
        setCurrentMaterial("VAMP");
      }

      if (window.innerWidth <= 600) {
        setSlideHeight(`${265}px`);
      } else {
        setSlideHeight(`${420}px`);
      }
    }
    if (slideIndex === 6) {
      if (window.innerWidth <= 600) {
        setSlideHeight(`${240}px`);
      } else {
        setSlideHeight(`${245}px`);
      }
    }
    if (slideIndex === 7) {
      if (window.innerWidth <= 600) {
        setSlideHeight(`${53}px`);
      } else {
        setSlideHeight(`${60}px`);
      }
    }
    if (slideIndex === 8) {
      setSlideHeight(`${360}px`);
    }
  }, [slideIndex]);

  return (
    <>
      <div
        className="mobOptions"
        style={{
          transform: openOption
            ? `translateY(-${slideHeight})`
            : `translateY(0)`,

          // bottom: openOption ? "100px" : "",
        }}
      >
        {custMobOptions.map((obj, index) => {
          return (
            <div
              key={obj.id}
              className={
                slideIndex === index + 1
                  ? "options-slide active-anim"
                  : "options-slide"
              }
            >
              <p
                onClick={handleOptionClick}
                className="optionTitle"
                style={{ color: obj.title == "SIZE" && SizeError && "red" }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.263"
                    height="1.5"
                    viewBox="0 0 22.263 1.5"
                  >
                    <path
                      id="Path_4676"
                      data-name="Path 4676"
                      d="M-2068.4,734.493h20.763"
                      transform="translate(2069.154 -733.743)"
                      fill="none"
                      stroke="#646464"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                {obj.title == "SIZE" && SizeError && "SELECT"}&nbsp;
                {obj.title}
              </p>

              <div className="optionPanel">
                {obj.title === "MODEL" && (
                  <div className="optionPanel__model">
                    <BaseModel
                      index={mainIndex}
                      setIndex={setIndex}
                      state={state}
                      openOption={openOption}
                      handleBaseModelClick={
                        handleBaseModelClick.handleBaseModelClick
                      }
                    />
                  </div>
                )}

                {obj.title === "STYLE" && (
                  <div className="optionPanel__style">
                    <ModelStyle
                      index={mainIndex}
                      setIndex={setIndex}
                      state={state}
                      handleModelStyleClick={
                        handleBaseModelClick.handleModelStyleClick
                      }
                    />
                  </div>
                )}

                {obj.title === "DECORATION" && (
                  <div className="optionPanel__decoration">
                    <Decoration
                      index={mainIndex}
                      setIndex={setIndex}
                      state={state}
                      handleDecorationClick={
                        handleBaseModelClick.handleDecorationClick
                      }
                    />
                  </div>
                )}

                {obj.title === "PATINA" && (
                  <div className="optionPanel__patina">
                    <Patina
                      index={mainIndex}
                      setIndex={setIndex}
                      state={state}
                      openOption={openOption}
                      handlePatinaClick={handleBaseModelClick.handlePatinaClick}
                    />
                  </div>
                )}

                {obj.title === "COLOUR/MATERIAL" && (
                  <>
                    {state.currentPatina == "with_patina" ? (
                      <div className="materialsOptions">
                        <p
                          onClick={() => handleMaterialClick("FULLGRAIN")}
                          style={{
                            fontFamily:
                              currentMaterial === "FULLGRAIN"
                                ? "H-Regular"
                                : "H-Light",
                            color:
                              currentMaterial === "FULLGRAIN"
                                ? "#000"
                                : "#646464",
                          }}
                        >
                          FullGrain
                        </p>

                        <p
                          onClick={() => handleMaterialClick("SUEDE")}
                          style={{
                            fontFamily:
                              currentMaterial === "SUEDE"
                                ? "H-Regular"
                                : "H-Light",
                            color:
                              currentMaterial === "SUEDE" ? "#000" : "#646464",
                          }}
                        >
                          Suede
                        </p>

                        <p
                          onClick={() => handleMaterialClick("LACES")}
                          style={{
                            fontFamily:
                              currentMaterial === "LACES"
                                ? "H-Regular"
                                : "H-Light",
                            color:
                              currentMaterial === "LACES" ? "#000" : "#646464",
                          }}
                        >
                          Lace
                        </p>

                        <p
                          onClick={() => handleMaterialClick("SOLE")}
                          style={{
                            fontFamily: currentMaterial.includes("SOLE")
                              ? "H-Regular"
                              : "H-Light",
                            color: currentMaterial.includes("SOLE")
                              ? "#000"
                              : "#646464",
                          }}
                        >
                          Sole
                        </p>
                      </div>
                    ) : (
                      <div className="materialsOptions">
                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("VAMP") && (
                          <p
                            onClick={() => handleMaterialClick("VAMP")}
                            style={{
                              fontFamily:
                                currentMaterial === "VAMP"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "VAMP" ? "#000" : "#646464",
                            }}
                          >
                            Vamp
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("QUARTER") && (
                          <p
                            onClick={() => handleMaterialClick("QUARTER")}
                            style={{
                              fontFamily:
                                currentMaterial === "QUARTER"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "QUARTER"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Quarter
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("CAPTOE") && (
                          <p
                            onClick={() => handleMaterialClick("CAPTOE")}
                            style={{
                              fontFamily:
                                currentMaterial === "CAPTOE"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "CAPTOE"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Cap Toe
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("COUNTER") && (
                          <p
                            onClick={() => handleMaterialClick("COUNTER")}
                            style={{
                              fontFamily:
                                currentMaterial === "COUNTER"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "COUNTER"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Counter
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("WINGTIP") && (
                          <p
                            onClick={() => handleMaterialClick("WINGTIP")}
                            style={{
                              fontFamily:
                                currentMaterial === "WINGTIP"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "WINGTIP"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Wing Tip
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("APRON") && (
                          <p
                            onClick={() => handleMaterialClick("APRON")}
                            style={{
                              fontFamily:
                                currentMaterial === "APRON"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "APRON"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Apron
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("UPPER") && (
                          <p
                            onClick={() => handleMaterialClick("UPPER")}
                            style={{
                              fontFamily:
                                currentMaterial === "UPPER"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "UPPER"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Upper
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("TASSEL") && (
                          <p
                            onClick={() => handleMaterialClick("TASSEL")}
                            style={{
                              fontFamily:
                                currentMaterial === "TASSEL"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "TASSEL"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Tassel
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("BINDING") && (
                          <p
                            onClick={() => handleMaterialClick("BINDING")}
                            style={{
                              fontFamily:
                                currentMaterial === "BINDING"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "BINDING"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Binding
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("SADDLE") && (
                          <p
                            onClick={() => handleMaterialClick("SADDLE")}
                            style={{
                              fontFamily:
                                currentMaterial === "SADDLE"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "SADDLE"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Saddle
                          </p>
                        )}

                        {decorationsTypeData[state.currentBase][
                          state.currentModel
                        ][state.currentDecoration].includes("LACES") && (
                          <p
                            onClick={() => handleMaterialClick("LACES")}
                            style={{
                              fontFamily:
                                currentMaterial === "LACES"
                                  ? "H-Regular"
                                  : "H-Light",
                              color:
                                currentMaterial === "LACES"
                                  ? "#000"
                                  : "#646464",
                            }}
                          >
                            Lace
                          </p>
                        )}

                        <p
                          onClick={() => handleMaterialClick("STITCHING")}
                          style={{
                            fontFamily:
                              currentMaterial === "STITCHING"
                                ? "H-Regular"
                                : "H-Light",
                            color:
                              currentMaterial === "STITCHING"
                                ? "#000"
                                : "#646464",
                          }}
                        >
                          Stitching
                        </p>

                        <p
                          onClick={() => handleMaterialClick("SOLE")}
                          style={{
                            fontFamily: currentMaterial.includes("SOLE")
                              ? "H-Regular"
                              : "H-Light",
                            color: currentMaterial.includes("SOLE")
                              ? "#000"
                              : "#646464",
                          }}
                        >
                          Sole
                        </p>
                      </div>
                    )}

                    {state.currentPatina == "with_patina" ? (
                      <div className="materialPanel">
                        {currentMaterial.includes("FULLGRAIN") && (
                          <>
                            <FullGrain
                              state={state}
                              setIndex={setIndex}
                              index={mainIndex}
                              handleColorClick={
                                handleBaseModelClick.handleFullGrainClick
                              }
                            />
                          </>
                        )}
                        {currentMaterial.includes("SUEDE") && (
                          <>
                            <PatinaSuede
                              state={state}
                              setIndex={setIndex}
                              index={mainIndex}
                              handleColorClick={
                                handleBaseModelClick.handleSuedeClick
                              }
                            />
                          </>
                        )}
                        {currentMaterial === "LACES" && (
                          <>
                            <Laces
                              state={state}
                              setIndex={setIndex}
                              index={mainIndex}
                              handleColorClick={
                                handleBaseModelClick.handleLaceClick
                              }
                            />
                          </>
                        )}
                        {currentMaterial.includes("SOLE") && (
                          <>
                            <Sole
                              state={state}
                              setIndex={setIndex}
                              index={mainIndex}
                              handleColorClick={
                                handleBaseModelClick.handleSoleClick
                              }
                            />
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="materialPanel">
                        {currentMaterial === "VAMP" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("VAMP") && (
                              <Vamp
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleVampClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "QUARTER" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("QUARTER") && (
                              <Quarter
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleQuarterClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "CAPTOE" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("CAPTOE") && (
                              <CapToe
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleCapToeClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "COUNTER" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("COUNTER") && (
                              <Counter
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleCounterClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "WINGTIP" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("WINGTIP") && (
                              <WingTip
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleWingTipClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "APRON" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("APRON") && (
                              <Apron
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleApronClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "UPPER" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("UPPER") && (
                              <Upper
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleUpperClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "TASSEL" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("TASSEL") && (
                              <Tassel
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleTasselClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "BINDING" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("BINDING") && (
                              <Binding
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleBindingClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "SADDLE" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("SADDLE") && (
                              <Saddle
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleSaddleClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "LACES" && (
                          <>
                            {decorationsTypeData[state.currentBase][
                              state.currentModel
                            ][state.currentDecoration].includes("LACES") && (
                              <Laces
                                state={state}
                                setIndex={setIndex}
                                index={mainIndex}
                                handleColorClick={
                                  handleBaseModelClick.handleLaceClick
                                }
                              />
                            )}
                          </>
                        )}

                        {currentMaterial === "STITCHING" && (
                          <>
                            <Stitching
                              state={state}
                              setIndex={setIndex}
                              index={mainIndex}
                              handleColorClick={
                                handleBaseModelClick.handleStitchClick
                              }
                            />
                          </>
                        )}

                        {currentMaterial.includes("SOLE") && (
                          <>
                            <Sole
                              state={state}
                              setIndex={setIndex}
                              index={mainIndex}
                              handleColorClick={
                                handleBaseModelClick.handleSoleClick
                              }
                            />
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}

                {obj.title === "SIZE" && (
                  <div className="optionPanel__size">
                    <Size
                      state={state}
                      setIndex={setIndex}
                      index={mainIndex}
                      handleSizeClick={handleBaseModelClick.handleSizeClick}
                      SizeError={SizeError}
                      // showModalSize={showModalSize}
                      // setShowModalSize={setShowModalSize}
                    />
                  </div>
                )}

                {obj.title === "WIDTH" && (
                  <div className="optionPanel__width">
                    <Width
                      state={state}
                      setIndex={setIndex}
                      index={mainIndex}
                      handleWidthClick={handleBaseModelClick.handleWidthClick}
                      // showModalSize={showModalSize}
                      // setShowModalSize={setShowModalSize}
                    />
                  </div>
                )}

                {obj.title === "ENGRAVING" && (
                  <div className="optionPanel__soleEngraving">
                    <SoleEngraving
                      state={state}
                      setIndex={setIndex}
                      index={mainIndex}
                      setState={setState}
                      setOpenOption={setOpenOption}
                      handleWidthClick={handleBaseModelClick.handleWidthClick}
                      engraveAdded={engraveAdded}
                      setEngraveAdded={setEngraveAdded}
                      // showModalSize={showModalSize}
                      // setShowModalSize={setShowModalSize}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="slider-btn-prev">
          <BtnSlider
            moveSlide={PrevSlide}
            direction={"prev"}
            slideIndex={slideIndex}
            custMobOptions={custMobOptions}
          />
        </div>
        <div className="slider-btn-next">
          <BtnSlider
            moveSlide={nextSlide}
            direction={"next"}
            slideIndex={slideIndex}
            custMobOptions={custMobOptions}
          />
        </div>
      </div>
    </>
  );
};

export default MobileAcc;
