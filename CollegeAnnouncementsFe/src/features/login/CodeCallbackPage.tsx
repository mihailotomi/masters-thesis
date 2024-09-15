import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useLoginPage } from "./useLoginPage";
import { Loader } from "@components";

export const CodeCallbackPage = () => {
    const location = useLocation();
    const { getAndVerifyTokens, onLoginError } = useLoginPage();
  
    useEffect(() => {
      const code = new URLSearchParams(location.search).get("code");
      const error = new URLSearchParams(location.search).get("error");
  
      if (error) {
        onLoginError();
      }
      if (code) {
        getAndVerifyTokens(code);
      }
    }, []);
  
    return (
      <>
        <div className="d-flex justify-content-center mt-5">
          <h3>Molim sačekajte...</h3>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Loader size="x-large" color="primary" />
        </div>
      </>
    );
  };