import router from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader2";

export default function LoaderForComponent() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      
    }, 1800);
  }, []);
  return <>{loading && <Loader />}</>;
}
