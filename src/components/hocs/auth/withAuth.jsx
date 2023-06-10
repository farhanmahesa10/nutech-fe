import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const withAuth = (Component) => {
  return (props) => {
    const [hasLoad, setHasLoad] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      let refreshToken = localStorage.getItem("refreshToken");
      let allow = true;
      if (refreshToken) {
        try {
          const decodedToken = jwt_decode(refreshToken);

          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp <= currentTime) {
            allow = false;

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }
          setHasLoad(true);
        } catch (error) {
          // return false;
          allow = false;
        }
      } else {
        allow = false;
      }

      if (!allow) {
        localStorage.setItem(
          "toast",
          JSON.stringify({
            condition: false,
            message: "You are not authenticated",
          })
        );
        navigate("/login");
      }
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
        <Component {...props} />
      </>
    );
  };
};

export default withAuth;
