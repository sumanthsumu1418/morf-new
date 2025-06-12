import React, { useState, useRef, useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import dynamic from "next/dynamic";
import { TimelineMax, Power3 } from "gsap";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import SEO from "@/components/layout/SEO";
import LoaderForComponent from "uitlity/loaderForComponent";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const subjectOptions = [
  {
    value: "Customer Support",
    label: "Customer Support",
  },

  {
    value: "Wedding Inquiries",
    label: "Wedding Inquiries",
  },

  {
    value: "Business",
    label: "Business ",
  },
];

const customStyle = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0",
    // borderColor: "#D3C5B0",
    outline: "none",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#fff",
    boxShadow: "none",
    height: "45px",
    borderBottom: "1px solid black",
    paddingLeft: "0px",
    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "12px",
    },

    "&:hover": {
      borderColor: "none",
    },
  }),
  valueContainer: (base, state) => ({
    ...base,
    paddingLeft: "0",
    paddingBottom: "5px",
  }),

  placeholder: (base, state) => ({
    ...base,
    color: "#000",
    opacity: 0.3,
    backgroundColor: "#fff",
    fontFamily: "H-Regular",
    marginLeft: "0",
    fontSize: "20px",
    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "12px",
    },
    "@media only screen and (min-width:601px) and (max-width: 1024px)": {
      fontSize: "12px",
    },
  }),
  indicatorSeparator: (base, state) => ({
    display: "none",
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
    fontFamily: "H-Regular",
    fontSize: "22px",
    outline: "none",
    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "13px",
    },
    "@media only screen and (min-width:601px) and (max-width: 1024px)": {
      fontSize: "15px",
    },
  }),
};

const Contact = () => {
  const [hostname, setHostname] = useState("");
  const textareaRef = useRef(null);
  const typeRef = useRef(null);
  const buttonRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    reValidateMode: "onChange",
  });

  const [showTextArea, setShowTextArea] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const target = e.target;

    textareaRef.current.style.height = "50px";
    textareaRef.current.style.height = `${target.scrollHeight}px`;
  };

  function animation() {
    var contact = new TimelineMax();

    contact.fromTo(
      ".contactOver",
      1.4,
      { scaleX: 1, transformOrigin: "right", ease: Power3.easeOut },
      { scaleX: 0 },
      0.5
    );
  }

  useEffect(() => {
    animation();
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateEmail = (email) => {
    if (checkEmail(email)) {
      setEmailTrigger(false);
      return true;
    } else {
      setEmailTrigger(true);
      return false;
    }
  };
  const registerContact = async () => {
    const res = await axios.post(
      "https://us11.list-manage.com/contact-form?u=02fe166a6110a63b33b620bbb&form_id=42dcea63b89904c3dfbae1e605912d26",
      // "https://us17.list-manage.com/contact-form?u=e75c86111bc01f7c0885b51e8&form_id=916e35a97e161b17e140c380d81edf95",

      {
        fields: {
          1277: email,
          1281: subject,
          1285: message,
          1289: name,
          1293: "bbb",
          1297: phone,
          subscribe: false,
        },
      },
      {
        withCredentials: false,
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      }
    );
    if (res.data.success) toast.success("Success!");
  };

  const submitForm = (formData) => {
    // setIsLoading(true);
    const reqPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: textareaRef.current.value,
      subject: formData.subject.value,
    };

    // Dummy handler for form submission
    toast.success("Your message has been sent (dummy mode)");
  };

  useEffect(() => {
    if (status === "SUCCESS") {
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

  return (
    <>
      <SEO
        title="CONTACT - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <React.Fragment>
        <BaseLayout hideFooter={true}>
          <section className="container contactUs">
            <h1 className="contactUs__heading"> Contact Us </h1>

            <p className="contactUs__subHeading">
              We always appreciate feedback and new business inquiries!
            </p>

            <form
              className="contactUs__form"
              onSubmit={handleSubmit(submitForm)}
            >
              <div className="contactUs__form--firstRow">
                <div className="nameField">
                  <label className="contactUsLabel"> Name </label>

                  <input
                    {...register("name", { required: true })}
                    className="contactUsInput"
                    type="text"
                    name="name"
                  />
                  {errors.name && (
                    <p className="errorText"> Name is required</p>
                  )}
                </div>

                <div className="nameField">
                  <label className="contactUsLabel"> Email </label>

                  <input
                    {...register("email", {
                      required: true,
                      maxLength: 50,
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    className="contactUsInput"
                    type="email"
                    name="email"
                  />

                  {errors.email && (
                    <>
                      {errors.email?.type === "required" && (
                        <p className="errorText">Email is required</p>
                      )}
                      {errors.email?.type === "maxLength" && (
                        <p className="errorText">Email is invalid</p>
                      )}
                      {errors.email?.type === "pattern" && (
                        <p className="errorText">Email is invalid</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="contactUs__form--firstRow">
                <div className="nameField">
                  <label className="contactUsLabel">
                    Phone Number (with Country code)
                  </label>

                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^[0]?[6789]\d{9}$/,
                    })}
                    className="contactUsInput"
                    type="tel"
                  />
                  {errors.phone && (
                    <>
                      {errors.phone?.type === "required" && (
                        <p className="errorText">Phone Number is required</p>
                      )}
                      {errors.phone?.type === "pattern" && (
                        <p className="errorText">Invalid Phone Number!</p>
                      )}
                    </>
                  )}
                </div>

                <div className="nameField">
                  <label className="contactUsLabel"> Choose Subject </label>

                  <div>
                    <Controller
                      name="subject"
                      rules={{ required: true }}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Select
                            {...field}
                            options={subjectOptions}
                            closeMenuOnSelect={true}
                            className="customSub"
                            placeholder="Select Subject"
                            styles={customStyle}
                            isSearchable={false}
                          />
                        );
                      }}
                    />
                    {errors?.subject && errors.subject.type === "required" && (
                      <p className="errorText">This field is required</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="textareaDiv nameField">
                <label className="contactUsLabel"> message </label>

                {showTextArea && (
                  <textarea
                    ref={textareaRef}
                    className="textarea"
                    onChange={handleChange}
                  ></textarea>
                )}

                {!showTextArea && (
                  <div
                    className="autoTyped"
                    onClick={(prev) => setShowTextArea(prev)}
                  >
                    <h1 className="typeTxt"> Type here </h1>
                  </div>
                )}
              </div>

              {/* {showTextArea && ( */}
              <button
                ref={buttonRef}
                type="submit"
                className="contactUsButton "
              >
                <span> Send Message </span>
              </button>
              {/* )} */}
            </form>

            <div className="contactOver"></div>
          </section>
          {/* <LoaderForComponent /> */}
        </BaseLayout>
        {status && (
          <div className="contact_successMsg">
            <p className="contact_successMsgText">
              Thank you! <br /> We will get in touch soon
            </p>
          </div>
        )}
      </React.Fragment>
    </>
  );
};

export default Contact;
