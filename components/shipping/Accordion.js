import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";

const Accordion = ({
  index,
  index2,
  index3,
  index4,
  index5,
  setIndex,
  setIndex2,
  setIndex3,
  setIndex4,
  setIndex5,
  shippingInfo,
  ...props
}) => {
  const contentRef = useRef(null);
  const [activeState, setActiveState] = useState("");

  // console.log("shippingInfo", shippingInfo);

  useEffect(() => {
    setIndex(0);
    setIndex2(0);
    setIndex3(0);
    setIndex4(0);
    setIndex5(0);

    if (shippingInfo === 1) {
      setIndex(1);
    } else if (shippingInfo === 2) {
      setIndex2(2);
    } else if (shippingInfo === 3) {
      setIndex3(3);
    } else if (shippingInfo === 4) {
      setIndex4(4);
    } else if (shippingInfo === 5) {
      setIndex5(5);
    }
  }, [shippingInfo]);

  return (
    <>
      <div className="accordion-section">
        <button
          className={`accordion-section-btn ${activeState}`}
          onClick={() => {
            setIndex(null);
            setIndex2(null);
            setIndex3(null);
            setIndex4(null);
            setIndex5(props.id === index5 ? null : props.id);
          }}
        >
          <p className="accordion-section-btn-title">Sizing</p>

          <div className="accordion-section-btn-icon">
            <svg
              className={`svgIcon`}
              style={{
                transform:
                  props.id === index5 ? "rotate(45deg)" : "rotate(0deg)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="Icon_metro-plus"
                data-name="Icon metro-plus"
                d="M18.071,7.928h-5.5v-5.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v5.5h-5.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h5.5v5.5a.5.5,0,0,0,.5.5h3a.5.5,0,0,0,.5-.5v-5.5h5.5a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,18.071,7.928Z"
                transform="translate(-2.571 -1.928)"
              />
            </svg>
          </div>
        </button>

        <div
          ref={contentRef}
          className="accordion-section-content"
          style={{
            maxHeight:
              props?.id === index5
                ? `${contentRef?.current?.scrollHeight}px`
                : "0px",
          }}
        >
          <div className="contentAnswer">
            <p>
              Morf has a wide range of size and width options which are true to
              size. Here’s a size guide to help you find the perfect fit for our
              shoes. Please note that our sizes are based on the standard UK
              sizing system.
            </p>
          </div>
          <div className="contentQuery">
            Refer to the following size chart to find your UK size:
          </div>
          <table>
            <thead>
              <tr>
                <th>UK</th>
                <th>US</th>
                <th>EU</th>
                <th>Foot length in mm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5</td>
                <td>6</td>
                <td>39</td>
                <td>243</td>
              </tr>
              <tr>
                <td>6</td>
                <td>7</td>
                <td>40</td>
                <td>251</td>
              </tr>
              <tr>
                <td>6.5</td>
                <td>7.5</td>
                <td>40.5</td>
                <td>255</td>
              </tr>
              <tr>
                <td>7</td>
                <td>8</td>
                <td>41</td>
                <td>260</td>
              </tr>
              <tr>
                <td>7.5</td>
                <td>8.5</td>
                <td>41.5</td>
                <td>264</td>
              </tr>
              <tr>
                <td>8</td>
                <td>9</td>
                <td>42</td>
                <td>268</td>
              </tr>
              <tr>
                <td>8.5</td>
                <td>9.5</td>
                <td>42.5</td>
                <td>272</td>
              </tr>
              <tr>
                <td>9</td>
                <td>10</td>
                <td>43</td>
                <td>276</td>
              </tr>
              <tr>
                <td>9.5</td>
                <td>10.5</td>
                <td>43.5</td>
                <td>280</td>
              </tr>
              <tr>
                <td>10</td>
                <td>11</td>
                <td>44</td>
                <td>284</td>
              </tr>
              <tr>
                <td>10.5</td>
                <td>11.5</td>
                <td>44.5</td>
                <td>286</td>
              </tr>
              <tr>
                <td>11</td>
                <td>12</td>
                <td>45</td>
                <td>292</td>
              </tr>
              <tr>
                <td>11.5</td>
                <td>12.5</td>
                <td>45.5</td>
                <td>296</td>
              </tr>
              <tr>
                <td>12</td>
                <td>13</td>
                <td>46</td>
                <td>300</td>
              </tr>
              <tr>
                <td>13</td>
                <td>14</td>
                <td>47</td>
                <td>308</td>
              </tr>
              <tr>
                <td>14</td>
                <td>15</td>
                <td>48</td>
                <td>316</td>
              </tr>
            </tbody>
          </table>

          <div className="contentQuery">
            We recommend following these guidelines:
          </div>
          <div className="contentAnswer">
            1. Measure your foot: Start by measuring your foot’s length. Place
            your foot on a piece of paper and trace its outline. Measure the
            distance from the back of your heel to the tip of your longest toe
            for length.
          </div>
          <div className="contentAnswer">
            2. Choose the width option: Our formal shoes come in two width
            options: Standard (E) and Wide (EE). If you have a wider foot, we
            recommend selecting the Wide (EE) option for a more comfortable fit.
          </div>
          <div className="contentAnswer">
            3. In-between sizes: If you find yourself between two sizes on our
            chart, we suggest opting for the higher size. It’s better to have a
            slightly roomier fit than a shoe that feels too tight.
          </div>
          <div className="contentAnswer">
            <p>
              4. Trying on the shoes: Once you receive your shoes, try them on
              and walk around to ensure a proper fit. Make sure there is enough
              room for your toes to move comfortably and that the shoes don’t
              slip off your heel. If you experience any discomfort or pinching,
              consider trying the next size up. Leather fit variation: Any model
              in full suede will feel more generous to its leather counterpart
            </p>
            <p>
              Please note that this size guide is specific to MORF and may not
              be applicable to other brands. It’s always advisable to consult
              the brand’s size chart and recommendations for the most accurate
              sizing information.
            </p>
            <p>
              If you have any further questions or need assistance with sizing,
              please don’t hesitate to contact our customer support. We’re here
              to help you find the perfect fit!
            </p>
          </div>
        </div>
      </div>
      <div className="accordion-section">
        <button
          className={`accordion-section-btn ${activeState}`}
          onClick={() => {
            setIndex5(null);
            setIndex2(null);
            setIndex3(null);
            setIndex4(null);
            setIndex(props.id === index ? null : props.id);
          }}
        >
          <p className="accordion-section-btn-title">Shipping</p>

          <div className="accordion-section-btn-icon">
            <svg
              className={`svgIcon`}
              style={{
                transform:
                  props.id === index ? "rotate(45deg)" : "rotate(0deg)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="Icon_metro-plus"
                data-name="Icon metro-plus"
                d="M18.071,7.928h-5.5v-5.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v5.5h-5.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h5.5v5.5a.5.5,0,0,0,.5.5h3a.5.5,0,0,0,.5-.5v-5.5h5.5a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,18.071,7.928Z"
                transform="translate(-2.571 -1.928)"
              />
            </svg>
          </div>
        </button>

        <div
          ref={contentRef}
          className="accordion-section-content"
          style={{
            maxHeight:
              props?.id === index
                ? `${contentRef?.current?.scrollHeight}px`
                : "0px",
          }}
        >
          <div className="contentAnswer">
            <p>
              We aim to provide all our customers a complete hassle-free shoe
              customization experience and to top it all WE DO NOT DISCRIMINATE.
              We offer free shipping worldwide on all our products.
            </p>
            <p>
              As much as we as a brand stand by freedom of choice and
              expression, we extend the idea to our shipping policy as well. All
              our prices are inclusive of all taxes, customs, levies and other
              charges whatsoever.
            </p>
          </div>

          <div className="contentQuery">Delivery Timeline</div>
          <div className="contentAnswer">
            Orders are dispatched within 4 days of receiving the order and is
            expected to be delivered within the next 2-5 days depending on your
            location.As soon as the order is shipped, the tracking information
            is shared to you via email.
          </div>
        </div>
      </div>
      <div className="accordion-section">
        <button
          className={`accordion-section-btn ${activeState}`}
          onClick={() => {
            setIndex5(null);
            setIndex3(null);
            setIndex4(null);
            setIndex(null);
            setIndex2(props.id === index2 ? null : props.id);
          }}
        >
          <p className="accordion-section-btn-title">Return & Exchanges</p>

          <div className="accordion-section-btn-icon">
            <svg
              className={`svgIcon`}
              style={{
                transform:
                  props.id === index2 ? "rotate(45deg)" : "rotate(0deg)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="Icon_metro-plus"
                data-name="Icon metro-plus"
                d="M18.071,7.928h-5.5v-5.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v5.5h-5.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h5.5v5.5a.5.5,0,0,0,.5.5h3a.5.5,0,0,0,.5-.5v-5.5h5.5a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,18.071,7.928Z"
                transform="translate(-2.571 -1.928)"
              />
            </svg>
          </div>
        </button>

        <div
          ref={contentRef}
          className="accordion-section-content"
          style={{
            maxHeight:
              props?.id === index2
                ? `${contentRef?.current?.scrollHeight}px`
                : "0px",
          }}
        >
          <div className="contentAnswer">
            <p>
              We thrive for excellence and put every possible effort to make
              sure the product meets our and all our customers’ expectations.
              Having said that, we offer completely free and simple returns and
              exchanges on all our products. Despite being customized uniquely
              for you, we are willing to push that extra mile to put a smile on
              your face.
            </p>
            <p>
              In case we haven’t done a great job with your shoes, just drop us
              an email within 15 days of receipt of your shoes at
              support mentioning your order number and we’ll take care
              from there. Once we have received the product back in the same
              condition it was dispatched, we’ll initiate a refund through the
              same payment method used while pacing the order. In the case of
              exchanges, we shall provide you with store credit for the full
              amount which you may use to make your new purchase.
            </p>
          </div>

          <div className="contentQuery">Cancellations</div>
          <div className="contentAnswer">
            We accept cancellations within 24 hrs of placing an order.
          </div>
          <div className="contentQuery">Returns & Refunds</div>
          <div className="contentAnswer">
            1. All orders can be returned within 30 days from the date of
            delivery.
          </div>
          <div className="contentAnswer">
            2. All sale/discounted products are non-returnable but may be
            exchanged against any other product within 30 days of the receipt of
            your order.
          </div>
          <div className="contentAnswer">
            3. Orders for which packaging is damaged, or the seal is broken
            should not be accepted by the customer.
          </div>
          <div className="contentAnswer">
            4. Items considered for return must be in an unused condition with
            all the packaging and other accessories intact. We suggest you try
            the shoes on a carpeted surface to avoid any damage to the shoes.
          </div>
          <div className="contentAnswer">
            5. All items returned go through a quality check by our quality
            team. The acceptance of the returned item will be informed to you
            via email within 1 business day from receiving the return
            consignment.
          </div>
        </div>
      </div>
      <div className="accordion-section">
        <button
          className={`accordion-section-btn ${activeState}`}
          onClick={() => {
            setIndex5(null);
            setIndex4(null);
            setIndex(null);
            setIndex2(null);
            setIndex3(props.id === index3 ? null : props.id);
          }}
        >
          <p className="accordion-section-btn-title">FAQs</p>

          <div className="accordion-section-btn-icon">
            <svg
              className={`svgIcon`}
              style={{
                transform:
                  props.id === index3 ? "rotate(45deg)" : "rotate(0deg)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="Icon_metro-plus"
                data-name="Icon metro-plus"
                d="M18.071,7.928h-5.5v-5.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v5.5h-5.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h5.5v5.5a.5.5,0,0,0,.5.5h3a.5.5,0,0,0,.5-.5v-5.5h5.5a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,18.071,7.928Z"
                transform="translate(-2.571 -1.928)"
              />
            </svg>
          </div>
        </button>

        <div
          ref={contentRef}
          className="accordion-section-content"
          style={{
            maxHeight:
              props?.id === index3
                ? `${contentRef?.current?.scrollHeight}px`
                : "0px",
          }}
        >
          <div className="contentQuery">How are my shoes made?</div>

          <div className="contentAnswer">
            <p>
              All our shoes are handcrafted by our highly skilled craftsmen with
              decades of experience.
            </p>
          </div>
          <div className="contentQuery">Where are my shoes made?</div>

          <div className="contentAnswer">
            <p>
              All the shoes are handcrafted in our factory in New Delhi, India
              which follows all the legal and environmental norms.
            </p>
          </div>
          <div className="contentQuery">
            How long will it take for my shoes to reach me?
          </div>

          <div className="contentAnswer">
            <p>
              Since the shoes are made on exclusive orders, we promise to
              deliver the shoes within 10 days of order place. Timelines during
              the festive season might cause delays.
            </p>
          </div>
          <div className="contentQuery">
            How do I find the perfect size for myself?
          </div>

          <div className="contentAnswer">
            <p>
              You can find your foot size with our foot size recommendation
              partners who have nailed their data capturing technology to
              calculate a shoe size with a few clicks. You can download the
              application on Google PlayStore and iPhone App Store or use their
              browser plug-in.
            </p>
          </div>
          <div className="contentQuery">
            <a
              href="https://findmeashoe.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              FIND ME A SHOE – IND
            </a>
          </div>
          <div className="contentQuery">
            Do I need to pay for Shipping separately?
          </div>

          <div className="contentAnswer">
            <p>
              All our prices are inclusive shipping irrespective of where you
              are getting them delivered. We are working on a mission to make
              this world one single marketplace with no borders.
            </p>
          </div>
        </div>
      </div>
      <div className="accordion-section">
        <button
          className={`accordion-section-btn ${activeState}`}
          onClick={() => {
            setIndex5(null);
            setIndex3(null);
            setIndex(null);
            setIndex2(null);
            setIndex4(props.id === index4 ? null : props.id);
          }}
        >
          <p className="accordion-section-btn-title">
            GENERAL TERMS AND CONDITIONS OF PURCHASE AND USE
          </p>

          <div className="accordion-section-btn-icon">
            <svg
              className={`svgIcon`}
              style={{
                transform:
                  props.id === index4 ? "rotate(45deg)" : "rotate(0deg)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="Icon_metro-plus"
                data-name="Icon metro-plus"
                d="M18.071,7.928h-5.5v-5.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v5.5h-5.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,.5.5h5.5v5.5a.5.5,0,0,0,.5.5h3a.5.5,0,0,0,.5-.5v-5.5h5.5a.5.5,0,0,0,.5-.5v-3A.5.5,0,0,0,18.071,7.928Z"
                transform="translate(-2.571 -1.928)"
              />
            </svg>
          </div>
        </button>

        <div
          ref={contentRef}
          className="accordion-section-content"
          style={{
            maxHeight:
              props?.id === index4
                ? `${contentRef?.current?.scrollHeight}px`
                : "0px",
          }}
        >
          <div className="contentQuery">1. INTRODUCTION</div>

          <div className="contentAnswer">
            <p>
              This document (together with the documents mentioned herein)
              establishes the general terms and conditions that govern the use
              of this website  and the purchase of products on it
              (hereinafter referred to as the "Conditions").
            </p>
            <p>
              We urge you to read the Conditions, our Cookies Policy, and our
              Privacy Policy (hereinafter, jointly, the “Data Protection
              Policies”) carefully before using this website. When using this
              website or placing an order on it, you are bound by these
              Conditions and our Data Protection Policies. If you don’t agree
              with the Conditions and with the Data Protection Policies, do not
              use this website.
            </p>
            <p>
              These Conditions may be modified. It is your responsibility to
              read them periodically, as the Conditions at the time of using the
              website or concluding of the relevant Contract (as defined further
              on) shall be those that apply.
            </p>
            <p>
              If you have any queries regarding the Conditions or the Data
              Protection Policies, you may contact us by using the contact form.
            </p>
            <p>
              The Contract (as defined below) may be executed, at your choice,
              in any of the languages in which the Conditions are available on
              this website.
            </p>
          </div>
          <div className="contentQuery">2. OUR DETAILS</div>

          <div className="contentAnswer">
            <p>
              The sale of goods through this website is carried out under the
              name MORF by FATTE A MANO PRIVATE LIMITED, an Indian company with
              a registered address at C-3/8 Prashant Vihar, Sec-14, Rohini, New
              Delhi, India, with an e- mail support address, telephone
              number +91-9811708031 and with Corporate Identification Number
              U36996DL2018PTC333344.
            </p>
          </div>
          <div className="contentQuery">
            3. YOUR DETAILS AND YOUR VISITS TO THIS WEBSITE
          </div>

          <div className="contentAnswer">
            <p>
              The information or personal details that you provide us shall be
              processed in accordance with the Data Protection Policies. When
              you use this website, you agree to the processing of the
              information and details and you state that all information and
              details provided are true and correspond to reality.
            </p>
          </div>
          <div className="contentQuery">4. USE OF OUR WEBSITE</div>

          <div className="contentAnswer">
            <p>
              When you use this website and place orders through it, you agree
              to:
            </p>
            <p style={{ paddingLeft: "20px" }}>
              1. Use this website to make inquiries and legally valid orders
              only.
            </p>
            <p style={{ paddingLeft: "20px" }}>
              2. Not to make any false or fraudulent orders. If an order of this
              type may reasonably be considered to have been placed, we shall be
              authorized to cancel it and inform the competent authorities.
            </p>
            <p style={{ paddingLeft: "20px" }}>
              3. Provide us with your email address, postal address, and/or
              other contact details truthfully and exactly.
            </p>
          </div>

          <div className="contentAnswer">
            <p>
              You also agree that we may use this information to contact you in
              the context of your order if necessary (see our Privacy Policy).
            </p>
            <p>
              If you do not provide us with all the information we need, you
              cannot place your order.
            </p>
            <p>
              When you place an order on this website, you state that you are
              over the age of 18 and are legally eligible to enter into binding
              contracts.
            </p>
          </div>
          <div className="contentQuery">5. SERVICE AVAILABILITY</div>
          <div className="contentAnswer">
            Although delivery service for the articles offered on this website
            is available worldwide we might not be able to serve certain
            locations that are beyond the reach of our courier partners.
          </div>
          <div className="contentQuery">6. FORMALIZING THE CONTRACT</div>
          <div className="contentAnswer">
            <p>
              To place an order, you must follow the online purchasing procedure
              and click on "Authorize payment". After doing so, you will receive
              an email confirming receipt of your order (the "Order
              Confirmation"). You will be informed via email that the order is
              being sent (the "Shipping Confirmation"). These Conditions and the
              Contract constitute a written agreement between us.{" "}
            </p>
          </div>
          <div className="contentQuery">
            7. TECHNICAL MEANS TO CORRECT ERRORS
          </div>
          <div className="contentAnswer">
            <p>
              {" "}
              In case you detect that an error occurred when entering your
              personal data during your registration as a the user of this
              website, you can modify them in the section "My Account".{" "}
            </p>
            <p>
              This website displays confirmation boxes in various sections of
              the purchase process that do not allow the order to continue if
              the information in these sections has not been correctly provided.
              Also, this website offers details of all the items you have added
              to your shopping cart during the purchase process so that before
              making the payment, you can modify the details of your order.
            </p>{" "}
            <p>
              If you detect an error in your order after the completion of the
              payment process, you should immediately contact our customer
              service, telephone, or email address above to correct the error.
            </p>{" "}
          </div>
          <div className="contentQuery">8. AVAILABILITY OF PRODUCTS</div>
          <div className="contentAnswer">
            <p>
              All product orders are subject to availability and ability to
              produce. Along this line, if there are difficulties regarding the
              supply of products or there are no more items left in stock, we
              reserve the right to provide you with information on substitute
              products of the same or higher quality and value that you may
              order. If you do not wish to order the substitute products, we
              will reimburse any amount that you may have paid.{" "}
            </p>
          </div>
          <div className="contentQuery">9. REFUSAL TO PROCESS AN ORDER </div>
          <div className="contentAnswer">
            <p>
              We reserve the right to remove any product from this website at
              any time and to remove or modify any material or content from the
              same. Although we will always do everything possible to process
              all orders, there may be exceptional circumstances that force us
              to refuse to process an order after having sent the Order
              Confirmation. We reserve the right to do so at any time.
            </p>{" "}
            <p>
              We shall not be liable to you or to any third party for removing
              any product from this website, or for removing or modifying any
              material or content from the website or not processing an order
              once we have sent the Order Confirmation.
            </p>
            <p>
              We shall not be liable to you or to any third party for removing
              any product from this website, or for removing or modifying any
              material or content from the website or not processing an order
              once we have sent the Order Confirmation.
            </p>
          </div>
          <div className="contentQuery">10. DELIVERY </div>
          <div className="contentAnswer">
            <p>
              Notwithstanding Clause 8 above regarding product availability and
              except for extraordinary circumstances, we will endeavour to send
              the order consisting of the product(s) listed in each Delivery
              Confirmation prior to the date indicated in the Delivery
              Confirmation in question or, if no delivery date is specified, in
              the estimated time frame indicated when selecting the delivery
              method and, in any case within a maximum period of 30 days from
              the date of the Order Confirmation.
            </p>{" "}
            <p>
              Nonetheless, there may be delays for reasons such as the
              occurrence of unforeseen circumstances or the delivery zone.
            </p>
            <p>
              If for any reason we are unable to comply with the delivery date,
              we will inform you of that situation and we will give you the
              option to continue with the purchase, establish a new delivery
              date, or cancel the order with full reimbursement of the amount
              paid. Keep in mind in any case that we do not make home deliveries
              on Sundays or bank holidays.
            </p>
            <p>
              For the purpose of these Conditions, the "delivery" shall be
              understood to have taken place or the order "delivered" as soon as
              you or a third party indicated by you acquires physical possession
              of the goods, which will be evidenced by the signing of the
              receipt of the order at the delivery address indicated by you.
            </p>
          </div>
          <div className="contentQuery">11. INABILITY TO DELIVER </div>
          <div className="contentAnswer">
            <p>
              If it is impossible for us to deliver your order, we will attempt
              to find a safe place to leave it. If we cannot find a safe place,
              your order will be returned to our warehouse.
            </p>{" "}
            <p>
              We will also leave a note explaining where your order is located
              and what to do to have it delivered again. If you will not be at
              the place of delivery at the agreed time, we ask you to contact us
              to organize delivery on another day.
            </p>
            <p>
              If after 30 days from the date your order is available for
              delivery, the order could not be delivered for reasons not
              attributable to us, we shall assume that you wish to cancel the
              Contract and it will be terminated. As a result of the termination
              of the Contract, we will refund you all payments received from
              you, including delivery charges (except for any additional charges
              resulting from your choice of any delivery method other than the
              ordinary delivery method that we offer) without any undue delay,
              and at any rate, within 30 days of the date on which this Contract
              has been terminated.
            </p>
            <p>
              Please keep in mind that transport derived from the termination of
              the Contract may have an additional cost which we will be entitled
              to pass on to you.
            </p>
          </div>
          <div className="contentQuery">
            12. TRANSMISSION OF RISK AND OWNERSHIP OF THE PRODUCTS{" "}
          </div>
          <div className="contentAnswer">
            <p>
              The products shall be under your responsibility from the moment of
              delivery to you as outlined in Clause 10 above. You will take
              ownership of the products when we receive full payment of all
              amounts due, including delivery charges, or at the moment of
              delivery (as defined in Clause 10 above) if that were to take
              place at a later time.
            </p>
          </div>
          <div className="contentQuery">13. PRICE AND PAYMENT </div>
          <div className="contentAnswer">
            <p>
              The price of the products will be as stipulated at all times on
              our website, except in the case of an obvious error. Although we
              make every effort to ensure that the prices featured on the
              website are correct, errors may occur. If we discover an error in
              the price of any of the products that you have ordered, we will
              inform you as soon as possible and give you the option of
              confirming your order at the correct price or cancelling it. If we
              are unable to contact you, the order will be considered cancelled
              and all amounts paid will be refunded to you in full.
            </p>{" "}
            <p>
              We are not obliged to provide you with any product at the
              incorrect lower price (even when we have sent the Shipping
              Confirmation) if the error in the price is obvious and
              unmistakable and could have reasonably been recognized by you as
              an incorrect price.
            </p>
            <p>
              The prices on the website may or may not include duties, taxes,
              cesses, and delivery Charges. In the case of the latter, the
              breakup of charges shall be provided for clarification at all
              times.
            </p>
            <p>
              Prices may change at any time. However, except as stipulated
              above, the changes shall not affect the orders for which we have
              sent an Order Confirmation.
            </p>
            <p>
              Once you have selected all articles that you wish to buy, they
              will be added to your basket. The next step will be to process the
              order and make the payment. To that end, you must follow the steps
              of the purchase process, indicating or verifying the information
              requested in each step. Furthermore, throughout the purchase
              process, before payment, you can modify the details of your order.
              You are provided with a detailed description of the purchase
              process in the Shopping Guide. Also, if you are a registered user,
              a record of all the orders placed by you is available in the "My
              Account" area.
            </p>
            <p>
              You may use, as a payment method, all cards, links, and options
              provided by our payment gateway partner.
            </p>
            <p>
              To minimize the risk of non-authorized access, your credit card/
              debit card/ net banking (mobile or internet) details will be
              encrypted. Other than where payment is by cash of delivery, the
              payment will be due and payable immediately at the time of placing
              the order.
            </p>
            <p>
              When you click "Authorize Payment", you are confirming that the
              credit card is yours.
            </p>
            <p>
              Credit cards and debit cards are subject to verification and
              authorization by the card issuing entity. If the entity does not
              authorize the payment (either by credit card/debit card/bank
              transfer), we shall not be liable for any delay or failure to
              deliver and we will be unable to conclude any Contract with you.
            </p>
          </div>
          <div className="contentQuery">14. INVOICE </div>
          <div className="contentAnswer">
            <p>
              The invoice will be provided to you along with the products when
              delivered.
            </p>
          </div>
          <div className="contentQuery">15. BUYING GOODS AS A GUEST </div>
          <div className="contentAnswer">
            <p>
              The functionality of buying goods as a guest is also available on
              the website. Under this type of purchase, only such data which are
              essential to process your order will be requested from you. Upon
              completion of the purchase process, you will be offered the
              possibility of registering as a user or continuing as a
              non-registered user.
            </p>
          </div>
          <div className="contentQuery">16. TAXES</div>
          <div className="contentAnswer">
            <p>
              Pursuant to the prevailing rules and regulations in force for the
              country of origin and country of destination of the goods, all
              purchases done through the website are subject to all applicable
              taxes, duties, and cesses applicable.
            </p>
            <p>
              The break-up of all the components may or may not be available to
              view. The final price shall always be inclusive of all such
              charges and costs.
            </p>
          </div>
          <div className="contentQuery">17. EXCHANGE/RETURN POLICY</div>
          <div className="contentAnswer">
            <h4>17.1 Contractual right of withdrawal</h4>
          </div>
          <div className="contentAnswer">
            <p>
              We grant you a period of 15 days from the date of receipt of the
              order to return the products (except those mentioned in Clause
              18.2 below, for which the right to cancel is excluded).
            </p>
            <p>
              In case you return the goods within the contractual term of the
              right of withdrawal, you will only be reimbursed with the amount
              paid for said products. Delivery charges will not be reimbursed.
            </p>
            <p>
              We reserve the right not to accept the return of products which
            </p>
            <p style={{ paddingLeft: "15px" }}>
              1. we believe are being returned after use, or
            </p>
            <p style={{ paddingLeft: "15px" }}>
              2. are damaged (except where the return is on account of damaged
              goods having been delivered to you).
            </p>
            <p>
              The withdrawal period will expire after 15 days from the day on
              which you received the goods To exercise the right of withdrawal,
              you may notify us by sending an email to support@morf.co or by
              writing to our contact form, of your decision to withdraw from
              this contract by an unequivocal statement (for example a letter
              sent by post or email or email).
            </p>
            <p>
              To meet the withdrawal deadline, it is sufficient for you to send
              your communication concerning your exercise of the right of
              withdrawal before the withdrawal period has expired.
            </p>
            <p>
              If you decide to withdraw from this Contract, and subject to the
              above, we will return to you all payments received from you,
              excluding delivery charges without any undue delay, within 30 days
              of the date on which this Contract has been terminated. The refund
              will be issued to the original payment method used during the
              purchase. However, if you selected Cash on Delivery upon the
              original sale, the refund will be made via local bank transfer
              within 15 days of the date of return of the goods when a home
              collection has been requested.
            </p>
            <p>
              You are only liable for any diminished value of the goods
              resulting from handling other than what is necessary to establish
              the nature, characteristics, and functioning of the goods.
            </p>
          </div>
          <div className="contentAnswer">
            <h4>17.2 Common provisions</h4>
          </div>
          <div className="contentAnswer">
            <p>
              You shall not have the right to withdraw from the Contract when it
              is for the delivery of any of the following Products:
            </p>
            <p style={{ paddingLeft: "15px" }}>
              1. Sealed goods that are not suitable for return due to hygiene
              reasons and were unsealed after delivery.
            </p>
            <p style={{ paddingLeft: "15px" }}>2. damaged goods</p>
            <p style={{ paddingLeft: "15px" }}>
              3. goods that have been used prior to withdrawal from the contract
            </p>
            <p>
              Your right to cancel the Contract shall apply exclusively to the
              products that are returned in the same condition in which you
              received them. No reimbursement will be made if the product has
              been used once it has been opened, for products that are not in
              the same condition as when they were delivered or if they have
              been damaged, so take care of the products(s) while in your
              possession. Please return the products using or including all
              their original packaging, instructions and other documents, if
              any, accompanying the products. In any case, you must send the
              product to be returned together with the receipt that you received
              when the product was delivered. You will find a summary on
              exercising this cancellation right when you receive the order.
            </p>
            <p>
              Upon cancellation, the return process shall be well communicated
              via emails. The return process shall be followed as it is to avoid
              any deviation/deterioration of the process or the goods.
            </p>

            <p>
              After examining the article, we will inform you of whether you
              have the right to reimbursement of the amounts paid. The refund
              (excluding delivery charges) will be paid as soon as possible and,
              in all cases, within 30 days at the most from the date on which
              you notified us of your intention to cancel.
            </p>
            <p>
              Notwithstanding the foregoing, we may withhold reimbursement until
              we have received the goods back or you have supplied evidence of
              having sent back the goods, whichever is the earliest. The refund
              will always be paid using the same payment means you used to pay
              for your purchase.
            </p>
            <p>
              If you have any questions, you can contact us on our contact form.
            </p>
          </div>
          <div className="contentAnswer">
            <h4>17.3 Returns of defective products</h4>
          </div>
          <div className="contentAnswer">
            <p>
              If you think that at the moment of delivery, the product is not as
              stipulated in the Contract, you must contact us immediately on our
              contact form or email, providing the product details and the
              damage sustained.
            </p>

            <p>
              The refunding or replacement of the article shall take place as
              soon as possible and in all cases within 14 days from the date on
              which we send you an email confirming that the refund or
              replacement of the product is going ahead.
            </p>
            <p>
              Upon cancellation, the return process shall be well communicated
              via emails. The return process shall be followed If a defect or
              damage is confirmed on the returned products, we will give you a
              complete refund including the charges you have accrued for
              delivery and return. The refund will always be paid using the same
              payment means you used to pay for your purchase.
            </p>

            <p>
              All rights recognized in current legislation shall be, in any
              case, safeguarded.
            </p>
            <p>
              Notwithstanding the foregoing, we may withhold reimbursement until
              we have received the goods back or you have supplied evidence of
              having sent back the goods, whichever is the earliest. The refund
              will always be paid using the same payment means you used to pay
              for your purchase.
            </p>
            <p>
              If you have any questions, you can contact us on our contact form.
            </p>
            <div className="contentQuery">
              18. LIABILITY AND WAIVING LIABILITY, STATUTORY CONSUMER RIGHTS
            </div>
            <div className="contentAnswer">
              <p>
                Unless otherwise indicated expressly in these Conditions, our
                liability regarding any product acquired on our website shall be
                limited strictly to the price of purchase of the said product.
              </p>
              <p>
                Notwithstanding the above, our liability shall not be waived nor
                limited in the following cases:
              </p>
              <p style={{ paddingLeft: "15px" }}>
                1. in case of death or personal harm caused by our negligence
              </p>
              <p style={{ paddingLeft: "15px" }}>
                2. in case of fraud or fraudulent deceit or
              </p>
              <p style={{ paddingLeft: "15px" }}>
                3. in any case in which it was illegal or illicit to exclude,
                limit or attempt to exclude or limit our liability.
              </p>
              <p>
                Notwithstanding the paragraph above, and to the extent legally
                allowed, and unless these Conditions indicate otherwise, we
                shall not accept any liability for the following losses,
                regardless of their origin:
              </p>
              <p style={{ paddingLeft: "15px" }}>1. loss of income or sales</p>
              <p style={{ paddingLeft: "15px" }}>2. operating loss</p>
              <p style={{ paddingLeft: "15px" }}>
                3. loss of profits or contracts
              </p>
              <p style={{ paddingLeft: "15px" }}>4. loss of forecast savings</p>
              <p style={{ paddingLeft: "15px" }}>5. loss of data and</p>
              <p style={{ paddingLeft: "15px" }}>
                6. loss of business or management time.
              </p>
              <p>
                Due to the open nature of this website and the possibility of
                errors in the storage and transmission of digital information,
                we do not warrant the accuracy and security of the information
                transmitted or obtained by means of this website, unless
                otherwise indicated expressly on this website.
              </p>
              <p>
                All product descriptions, information, and materials shown on
                this website are provided "as is", with no express or implied
                warranties on the same, except those legally established. In
                this sense, if you are contracting as a consumer or user, we are
                obliged to deliver goods that are in conformity with the
                Contract, being liable to you for any lack of conformity that
                exists at the time of delivery.
              </p>
              <p>
                It is understood that the goods are in conformity with the
                Contract if they: comply with the description given by us and
                possess the qualities that we have presented on this website are
                fit for the purposes for which goods of this kind are normally
                used show the quality and performance which are normal in goods
                of the same type and which can reasonably be expected. To the
                extent permitted by law, we exclude all warranties, except those
                that may not be excluded legitimately.
              </p>
            </div>
            <div className="contentQuery">19. INTELLECTUAL PROPERTY</div>
            <div className="contentAnswer">
              <p>
                You recognize and agree that all copyright, registered
                trademarks, and other intellectual property rights on all
                materials or contents provided as part of the website belong to
                us at all times or to those who grant us the license for their
                use. You may use said material only to the extent that we or the
                usage licenses authorize expressly. This does not prevent you
                from using this website to the extent necessary to copy the
                information on your order or contact details.
              </p>
            </div>
            <div className="contentQuery">
              20. VIRUSES, PIRACY, AND OTHER COMPUTER ATTACKS
            </div>
            <div className="contentAnswer">
              <p>
                You must not make undue use of this website by intentionally
                introducing viruses, Trojans, worms, logic bombs, or any other
                software or technologically damaging or harmful material. You
                shall not attempt to make unauthorized access to this website,
                the server on which the site is hosted or any server, computer
                or database related to our website. You undertake not to attack
                this website through any attack of denial of service or an
                attack of distributed denial of service.
              </p>
              <p>
                Failure to comply with this Clause shall be considered an
                infraction as defined under the applicable regulations. We will
                report any failure to comply with this regulation to the
                corresponding authorities and we will cooperate with them to
                determine the identity of the attacker. Likewise, in the event
                of failure to comply with this Clause, authorization to use this
                website shall be suspended immediately. We shall not be held
                liable for any damage or harm resulting from a denial of service
                attack, virus or any other software or technologically damaging
                or harmful material that may affect your computer, IT equipment,
                data or materials as a result of using this website or
                downloading content from the same or those to which this site
                redirects you.
              </p>
            </div>
            <div className="contentQuery">21. LINKS FROM OUR WEBSITE</div>
            <div className="contentAnswer">
              <p>
                If our website contains links to other websites and third-party
                materials, said links are provided for information purposes only
                and we have no control over the content of those websites or
                materials. Accordingly, we shall not accept any liability for
                any damage or harm deriving from their use.
              </p>
            </div>
            <div className="contentQuery">22. WRITTEN COMMUNICATION</div>
            <div className="contentAnswer">
              <p>
                The applicable regulations require that some of the information
                or notifications that we send to you be in written form. By
                using this website, you agree that most of the communication
                with us will be electronics. We will contact you by email or we
                will provide you with information by posting alerts on this
                website. For contractual purposes, you agree to use this
                electronic means of communication and accept that all contracts,
                notifications, information, and other communication that we send
                you electronically complies with the legal requirements of
                providing it in writing. This condition will not affect your
                statutory rights.
              </p>
            </div>
            <div className="contentQuery">23. NOTIFICATIONS</div>
            <div className="contentAnswer">
              <p>
                The notifications that you send us must be sent preferably
                through our contact form. Pursuant to the provisions in Clause
                23 above and unless otherwise stipulated, we may send you
                notifications either by email or to the postal address you
                provided us when placing an order.
              </p>
              <p>
                It is understood that notifications will be received and acted
                upon as soon as they are posted on our website, 24 hours after
                they have been sent by email or three days after the postage
                date on any letter.
              </p>
              <p>
                As proof that the notification has been sent, it shall be
                sufficient to prove, in the case of a letter, that it was
                correctly addressed, that the correct postage was paid and that
                it was duly delivered to the post office or to a mailbox in the
                case of an email, the notification was sent to the email address
                specified by the recipient.
              </p>
            </div>
            <div className="contentQuery">
              24. TRANSFER OF RIGHTS AND OBLIGATIONS
            </div>
            <div className="contentAnswer">
              <p>
                The Contract is binding for both parties, as well as for our
                respective successors, transferees, and heirs.
              </p>
              <p>
                You may not transmit, cede, levy, or in any other way transfer a
                Contract or any of the rights or obligations derived from the
                same, without having obtained our written consent in advance.
              </p>
              <p>
                We may transmit, cede, levy, subcontract, or in any other way
                transfer a Contract or any of the rights or obligations derived
                from the same, at any time during the life of the Contract. To
                avoid any doubt, said transmissions, cessions, levies, or other
                transfers shall not affect the rights that, as applicable, you
                have as a consumer recognized by law or cancel, reduce or limit
                in any way the express and tacit warranties that we may have
                given you.
              </p>
            </div>
            <div className="contentQuery">25. EVENTS BEYOND OUR CONTROL</div>
            <div className="contentAnswer">
              <p>
                We will not be liable for any non-compliance or delay in
                compliance with any of the obligations we assume under a
                Contract when caused by events that are beyond our reasonable
                control (&quotForce Majeure&quot). Force Majeure shall include
                any act, event, failure to exercise, omission or accident that
                is beyond our reasonable control, including, among others, the
                following:
              </p>
              <p style={{ paddingLeft: "15px" }}>
                1. Strike, lockout or other forms of protest.
              </p>
              <p style={{ paddingLeft: "15px" }}>
                2. Civil unrest, revolt, invasion, terrorist attack or terrorist
                threat, war (declared or not) or threat or preparation for war.
              </p>
              <p style={{ paddingLeft: "15px" }}>
                3. Fire, explosion, storm, flood, earthquake, collapse, epidemic
                or any other natural disaster.
              </p>
              <p style={{ paddingLeft: "15px" }}>
                4. Inability to use trains, ships, aircraft, motorized transport
                or other means of transport, public or private.
              </p>
              <p style={{ paddingLeft: "15px" }}>
                5. Inability to use public or private telecommunication systems.
              </p>
              <p style={{ paddingLeft: "15px" }}>
                6. Strike, failure or accident in maritime or river transport,
                postal transport or any other type of transport.
              </p>
              <p>
                It shall be understood that our obligations deriving from
                Contracts are suspended during the period in which Force Majeure
                remains in effect and we will be given an extension of the
                period in which to fulfil these obligations by an amount of time
                equal to the time that the situation of Force Majeure lasted. We
                will provide all reasonable resources to end the situation of
                Force Majeure or to find a solution that enables us to fulfil
                our obligations by virtue of the Contract despite the situation
                of Force Majeure.
              </p>
            </div>
            <div className="contentQuery">26. WAIVING RIGHTS</div>
            <div className="contentAnswer">
              <p>
                The lack of requirement on our part for strict compliance on
                your part with any of the obligations assumed by you by virtue
                of a Contract or of these Conditions or a lack of exercising on
                our part of the rights or actions that correspond to us by
                virtue of this Contract or of the Conditions shall not
                constitute the waiving or limitation of said rights or actions,
                nor exonerate you from fulfilling said obligations.
              </p>
              <p>
                The waiving on our part of a specific right or action shall not
                constitute the waiving of other rights or actions derived from
                the Contract or from the Conditions.
              </p>
              <p>
                The waiving on our part of any of these Conditions or of the
                rights or actions derived from the Contract shall not take
                effect unless expressly stipulated that it is a waiving of
                rights and is formalized and notified to you in accordance with
                the provisions of the Notifications section above.
              </p>
            </div>
            <div className="contentQuery">28. ENTIRE CONTRACT</div>
            <div className="contentAnswer">
              <p>
                These Conditions and any document referenced in the same
                constitute the Entire Contract between the Parties as regards
                the purpose of the same, replacing any previous pact, agreement
                or promise made between the Parties verbally or in writing.
              </p>
              <p>
                The Parties acknowledge that we have agreed to enter into the
                Contract without depending on any declaration or promise made by
                the other Party or that could have been inferred from any
                statement or document in the negotiations entered into by the
                two Parties prior to said Contract, except those expressly
                mentioned in these Conditions.
              </p>
              <p>
                Neither Party shall take any action regarding any untrue
                statement made by the other Party, verbally or in writing, prior
                to the date of the Contract (unless said untrue statement was
                made fraudulently). The only action that may be taken by the
                other Party shall be due to breach of contract in accordance
                with the provisions of these Conditions.
              </p>
            </div>
            <div className="contentQuery">
              29. OUR RIGHT TO MODIFY THESE CONDITIONS
            </div>
            <div className="contentAnswer">
              <p>
                We have the right to review and modify these Conditions at any
                time.
              </p>
              <p>
                You are subject to the policies and Conditions in effect at the
                moment in which you use this website or place each order, except
                when by law or decision of governmental entities we must make
                changes retroactively to said policies, Conditions or Privacy
                Policy. In this case the possible changes will also affect
                orders made previously by you.
              </p>
            </div>
            <div className="contentQuery">
              30. APPLICABLE LEGISLATION AND JURISDICTION
            </div>
            <div className="contentAnswer">
              <p>
                The use of our website and the product purchase contracts
                through said website shall be governed by the laws of India.
              </p>
              <p>
                Any controversy that arises or is related to the use of the
                website or said contracts shall be subject to the exclusive
                jurisdiction of the Indian courts in New Delhi.
              </p>
              <p>
                If you are entering into the contract as a consumer, nothing in
                this Clause shall affect the statutory rights you have, as
                recognised in any applicable legislation in this area.
              </p>
            </div>
            <div className="contentQuery">31. COMMENTS AND SUGGESTIONS</div>
            <div className="contentAnswer">
              <p>
                Your comments and suggestions are always welcome. Please send
                any comments and suggestions through our contact form or other
                provided contact media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
