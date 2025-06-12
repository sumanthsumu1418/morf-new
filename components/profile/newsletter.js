import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useSelector } from "react-redux";
import Button from "../Button";
import { fontSize } from "@mui/system";

const Newsletter = () => {
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [isNA, setIsNA] = useState(false);
  const [isSnP, setIsSnP] = useState(false);
  const [isCU, setIsCU] = useState(false);
  const [error, seterror] = useState("");
  const [Reason, setReason] = useState("");

  const email = useSelector((state) => state?.user?.userData?.emailAddress);
  const user = useSelector((state) => state.user.userData);

  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateEmail = (email) => {
    if (checkEmail(email)) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };

  const customStyle = {
    control: (base, state) => ({
      ...base,
      borderRadius: "0",
      // borderColor: "#D3C5B0",
      outline: "none",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#EBEBEB",
      boxShadow: "none",
      height: "45px",
      fontFamily: "H-Regular",

      "&:hover": {
        borderColor: "none",
      },
    }),
    placeholder: (base, state) => ({
      ...base,
      color: "#7D7D7D",
      backgroundColor: "#EBEBEB",
      textTransform: "uppercase",
      fontFamily: "H-Regular",
      fontSize: "15px",
    }),
    option: (base, state) => ({
      ...base,
      outline: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "H-Light",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "black" : "#F3F1F0",
      "&:hover": {
        color: "white",
        backgroundColor: "black",
      },
    }),
    menu: (base, state) => ({
      ...base,
      borderRadius: "0",
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "#000",
      fontFamily: "H-Light",
      fontSize: "15px",
      outline: "none",
      "@media only screen and (min-width:320px) and (max-width: 600px)": {
        fontSize: "12px",
      },
      "@media only screen and (min-width:601px) and (max-width: 1024px)": {
        fontSize: "12px",
      },
    }),
  };

  const unsubscribeOptions = [
    { value: "notRelevant", label: "Not Relevant Anymore" },
  ];

  return (
    <div className="newsLetter">
      {isSubscribe ? (
        <>
          <div className="newsletterHeaderContainer">
            <div className="newsletterHeader">
              <div className="newsletterHeadingContainer">
                <div className="newsletterHeading">
                  <p>NEWSLETTER</p>
                </div>
                <div className="newsletterSubheading">
                  <p>Set up your newsletter to receive updates.</p>
                </div>
              </div>
              <div
                className="newsletterSubscribeButton  common-btn-style-alt"
                onClick={() => {
                  setIsNA(false);
                  setIsCU(false);
                  setIsSnP(false);
                  setIsSubscribe(!isSubscribe);
                }}
              >
                {!isSubscribe ? (
                  <span>Subscribe</span>
                ) : (
                  <span>Unsubscribe</span>
                )}
              </div>
            </div>
            <div className="newsletterHeaderDivider"></div>
          </div>
          <div className="newsletterbody">
            <div className="newsletterbody__First">
              <p className="First__Heading">
                PLEASE SELECT THE TOPICS OF YOUR INTEREST
              </p>
              <p className="First__Subheading">Please select at least one.</p>
            </div>
            <div className="newsletterbody__Second">
              <div className="NewArrivals" onClick={() => setIsNA(!isNA)}>
                <div className="NewArrivalsInner">
                  <div
                    className={`NewArrivalsCircle ${
                      isNA && "NA_CircleSelected"
                    }`}
                  >
                    {isNA && <div className="NewArrivalsInnerCircle"></div>}
                  </div>
                  <p className={`NewArrivalsText ${isNA && "NA_TxtSelected"}`}>
                    New Arrivals
                  </p>
                </div>
                <div
                  className={`NewArrivalsDividerLine ${
                    isNA && "NA_DivSelected"
                  }`}
                ></div>
              </div>
              <div className="SalesAndPromo" onClick={() => setIsSnP(!isSnP)}>
                <div className="SalesAndPromoInner">
                  <div
                    className={`SalesAndPromoCircle ${
                      isSnP && "SnP__CircleSelected"
                    }`}
                  >
                    {isSnP && <div className="SalesAndPromoInnerCircle"></div>}
                  </div>
                  <p
                    className={`SalesAndPromoText ${
                      isSnP && "SnP_TxtSelected"
                    }`}
                  >
                    Sales & Promotion
                  </p>
                </div>
                <div
                  className={`SalesAndPromoDividerLine ${
                    isSnP && "SnP_DivSelected"
                  }`}
                ></div>
              </div>
              <div className="CompanyUpdates" onClick={() => setIsCU(!isCU)}>
                <div className="CompanyUpdatesInner">
                  <div
                    className={`CompanyUpdatesCircle ${
                      isCU && "CU_CircleSelected"
                    }`}
                  >
                    {isCU && <div className="CompanyUpdatesInnerCircle"></div>}
                  </div>
                  <p
                    className={`CompanyUpdatesText ${
                      isCU && "CU_TxtSelected"
                    } `}
                  >
                    Company Updates
                  </p>
                </div>
                <div
                  className={`CompanyUpdatesDividerLine ${
                    isCU && "CU_DivSelected"
                  }`}
                ></div>
              </div>
            </div>

            <MailchimpSubscribe
              url={`${process.env.MAILCHIMP_POST_API}?u=${process.env.MAILCHIMP_U_VALUE}&amp;id=${process.env.MAILCHIMP_FORM_ID}`}
              method="post"
              id="mc-embedded-subscribe-form"
              render={(props) => {
                const { subscribe, status, message } = props || {};

                return (
                  <div className="newsletterbody__Third">
                    <p className="Third__UpperTxt">
                      By submitting I accept the
                    </p>
                    <p className="Third__LowerTxt">
                      Newsletter Terms & Conditions.
                    </p>
                    <div
                      className={`Third__SubmitButton ${
                        (isNA || isSnP || isCU) &&
                        "Third__Selected  common-btn-style"
                      } `}
                      onClick={() => {
                        subscribe({
                          EMAIL: email,
                          [`group[480490][${isNA ? 1 : 0}]`]: true,
                          [`group[480490][${isSnP ? 2 : 0}]`]: true,
                          [`group[480490][${isCU ? 4 : 0}]`]: true,
                        });
                        toast.success("Your interest save successfully");
                      }}
                    >
                      <span>SUBMIT</span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="newsletterHeaderContainer">
            <div className="newsletterHeader">
              <div className="newsletterHeadingContainer">
                <div className="newsletterHeading">
                  <p>UNSUBSCRIBE NEWSLETTER</p>
                </div>
                <div className="newsletterSubheading">
                  <p>Please select the topics and confirm to unsubscribe.</p>
                </div>
              </div>
              <div
                className="newsletterSubscribeButton  common-btn-style-alt"
                onClick={() => setIsSubscribe(!isSubscribe)}
              >
                {!isSubscribe ? (
                  <span>Subscribe</span>
                ) : (
                  <span>Unsubscribe</span>
                )}
              </div>
            </div>
            <div className="newsletterHeaderDivider"></div>
          </div>
          <div className="newsletterbody">
            <div className="newsletterbody__First">
              <p className="First__Heading">WE'RE SORRY TO SEE YOU GO!</p>
              <p className="First__Subheading">
                Please deselect the topics you want to unsubscribe.
              </p>
            </div>
            <div className="newsletterbody__Second">
              <div className="NewArrivals" onClick={() => setIsNA(!isNA)}>
                <div className="NewArrivalsInner">
                  <div
                    className={`NewArrivalsCircle ${
                      isNA && "NA_CircleSelected"
                    }`}
                  >
                    {isNA && <div className="NewArrivalsInnerCircle"></div>}
                  </div>
                  <p className={`NewArrivalsText ${isNA && "NA_TxtSelected"}`}>
                    New Arrivals
                  </p>
                </div>
                <div
                  className={`NewArrivalsDividerLine ${
                    isNA && "NA_DivSelected"
                  }`}
                ></div>
              </div>
              <div className="SalesAndPromo" onClick={() => setIsSnP(!isSnP)}>
                <div className="SalesAndPromoInner">
                  <div
                    className={`SalesAndPromoCircle ${
                      isSnP && "SnP__CircleSelected"
                    }`}
                  >
                    {isSnP && <div className="SalesAndPromoInnerCircle"></div>}
                  </div>
                  <p
                    className={`SalesAndPromoText ${
                      isSnP && "SnP_TxtSelected"
                    }`}
                  >
                    Sales & Promotion
                  </p>
                </div>
                <div
                  className={`SalesAndPromoDividerLine ${
                    isSnP && "SnP_DivSelected"
                  }`}
                ></div>
              </div>
              <div className="CompanyUpdates" onClick={() => setIsCU(!isCU)}>
                <div className="CompanyUpdatesInner">
                  <div
                    className={`CompanyUpdatesCircle ${
                      isCU && "CU_CircleSelected"
                    }`}
                  >
                    {isCU && <div className="CompanyUpdatesInnerCircle"></div>}
                  </div>
                  <p
                    className={`CompanyUpdatesText ${
                      isCU && "CU_TxtSelected"
                    } `}
                  >
                    Company Updates
                  </p>
                </div>
                <div
                  className={`CompanyUpdatesDividerLine ${
                    isCU && "CU_DivSelected"
                  }`}
                ></div>
              </div>
            </div>
            <div className="newsletterbody__Third">
              <p className="Third__Heading">PLEASE SELECT THE REASON</p>
              <Select
                options={unsubscribeOptions}
                styles={customStyle}
                onChange={(e) => {
                  setReason(e.value);
                }}
                placeholder={"Please Select One Reason"}
              />
            </div>
            <MailchimpSubscribe
              url={`${process.env.MAILCHIMP_POST_API}?u=${process.env.MAILCHIMP_U_VALUE}&amp;id=${process.env.MAILCHIMP_FORM_ID}`}
              method="post"
              id="mc-embedded-subscribe-form"
              render={(props) => {
                const { subscribe, status, message } = props || {};

                return (
                  <div className="newsletterbody__Third">
                    <p className="Third__UpperTxt">
                      By submitting I accept the
                    </p>
                    <p className="Third__LowerTxt">
                      Newsletter Terms & Conditions.
                    </p>
                    <div
                      className={`Third__SubmitButton ${
                        (isNA || isSnP || isCU) &&
                        "Third__Selected  common-btn-style"
                      } `}
                      onClick={() => {
                        if (Reason.length) {
                          subscribe({
                            EMAIL: email,
                            [`group[480490][${isNA ? 0 : 10}]`]: true,
                            [`group[480490][${isSnP ? 0 : 10}]`]: true,
                            [`group[480490][${isCU ? 0 : 10}]`]: true,
                          });
                          toast.success("Your interest save successfully");
                        } else toast.error("PLEASE SELECT THE REASON");
                      }}
                    >
                      <span>SUBMIT</span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Newsletter;
