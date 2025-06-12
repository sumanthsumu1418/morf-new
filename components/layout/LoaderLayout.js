
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader2";

export default function LoaderLayout(props) {
  const [showLoader, setshowLoader] = useState(true);
 
  useEffect(() => {
    
    
      setTimeout(() => {
        setshowLoader(false);
      }, 1000);
  },[])

  if (showLoader) return <Loader />;
  return <div>{props?.children}</div>;
}
