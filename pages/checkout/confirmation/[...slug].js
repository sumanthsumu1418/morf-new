import BaseLayout from "@/components/layout/BaseLayout";
import React from "react";
import Button from "@/components/Button";
import LoaderForComponent from "uitlity/loaderForComponent";
const Index = () => {
  return (
    <div>
      <BaseLayout smooth={false}>
        <div className="order_confirmation">
          <img src="/images/order_complete.webp" alt="" />
          <div style={{ display: "flex", gap: "40px" }}>
            <Button className="payment-Btn" action="Go To Home" />
            <Button className="payment-Btn" action="Download Receipt" />
          </div>
        </div>
        <LoaderForComponent />
      </BaseLayout>
    </div>
  );
};

export default Index;
