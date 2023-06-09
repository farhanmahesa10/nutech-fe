import React, { useEffect, useState } from "react";
import { AuthLayout } from "../../../components/layouts";
import FormControl from "../../../components/atoms/Form/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { POST } from "../../../configs/api/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { withCheckAuth } from "../../../components/hocs";
import { ServerSideLoading } from "../../../components/atoms";
const Login = () => {
  const navigate = useNavigate();
  const [reqLoading, setReqLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Kolom ini tidak boleh kosong"),
    password: Yup.string().required("Kolom ini tidak boleh kosong"),
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      handleLogin(values);
    },
  });

  const handleLogin = async (data) => {
    setReqLoading(true);
    try {
      const result = await POST("/login", data);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      navigate("/");
    } catch (error) {
      toast.error("Username / Password salah");
    }
    setReqLoading(false);
  };

  useEffect(() => {
    try {
      let toastMessage = localStorage.getItem("toast");
      if (toastMessage) {
        toast.error(JSON.parse(toastMessage).message);
        localStorage.removeItem("toast");
      }
    } catch (error) {}
  }, []);

  return (
    <AuthLayout childrenPosition="right">
      <div className="relative">
        {reqLoading && <ServerSideLoading fixCenter />}
      </div>
      <Toaster />
      <div className="h-screen flex gap-4 flex-col justify-center">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="font-h1 text-center">LOGIN!</h1>
          <p className="my-2 text-center">Welcome,back</p>
          <div className=" px-2 rounded-[8px] bg-yellow-400/30 my-4">
            <p className="mt-[24px] e font-lg font-semibold">
              Silahkan masukan akun berikut :
            </p>
            <p>Username : admin</p>
            <p>Password : 1234</p>
          </div>
          <div>
            <FormControl
              label="Username"
              onChange={formik.handleChange}
              meta={formik.getFieldMeta("username")}
              name="username"
              control="input"
              placeholder="Masukan username"
              value={formik.values.username || ""}
            />
          </div>
          <div className="mt-4">
            <FormControl
              label="Password"
              onChange={formik.handleChange}
              meta={formik.getFieldMeta("password")}
              control="password"
              name="password"
              autoComplete="off"
              type="password"
              placeholder="Masukan password"
              value={formik.values.password || ""}
            />
          </div>
          <div className="mt-4 w-full">
            <button
              type="submit"
              className="btn py-2 bg-blue-500 text-white w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default withCheckAuth(Login);
