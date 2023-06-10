import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
const withCheckAuth = (Component) => {
  return (props) => {
    const [hasLoad, setHasLoad] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      let refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const decodedToken = jwt_decode(refreshToken);

          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp > currentTime) {
            // Token blm kedaluwarsa
            navigate("/");
          }
          // setHasLoad(true);
        } catch (error) {
          setHasLoad(true);
          // navigate("/login");
        }
      } else {
        setHasLoad(true);
      }
      setHasLoad(true);
    }, []);

    if (!hasLoad) {
      return (
        <>
          {/* <div className="flex h-screen w-screen items-center justify-center">
          <h4 className="font-h4">Waiting content..</h4>
        </div> */}
        </>
      );
    }
    return (
      <>
        <Toaster />
        <Component {...props} />
      </>
    );
  };
};

export default withCheckAuth;
