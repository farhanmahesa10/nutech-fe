import React, { useEffect, useState } from "react";
import { FormControl, ModalFrame } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
const ModalAddProduct = (props) => {
  const { open, setOpen, onSubmit, defaultValue, title } = props;
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Kolom ini tidak boleh kosong"),
    harga_beli: Yup.number()
      .required("Kolom ini tidak boleh kosong")
      .typeError("Kolom ini harus berisi muber"),
    harga_jual: Yup.number()
      .required("Kolom ini tidak boleh kosong")
      .typeError("Kolom ini harus berisi muber"),
    stok: Yup.number()
      .required("Kolom ini tidak boleh kosong")
      .typeError("Kolom ini harus berisi muber"),
    foto: Yup.string().required("Kolom ini tidak boleh kosong"),
  });
  const [initialValues, setInitialValues] = useState({
    nama: "",
    foto: "",
    harga_beli: "",
    harga_jual: "",
  });
  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  useEffect(() => {
    if (defaultValue) {
      setInitialValues(defaultValue);
    } else {
      setInitialValues({
        nama: "",
        foto: "",
        stok: "",
        harga_beli: "",
        harga_jual: "",
      });
    }
  }, [defaultValue]);

  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  return (
    <ModalFrame
      open={open}
      setOpen={setOpen}
      frameClassName="w-full max-w-[336px] sm:max-w-[436px] md:max-w-[738px] rounded-[8px] shadow-base "
    >
      <div className="bg-white p-4 rounded-[8px] ">
        <h4 className="font-h5 md:font-h4">{title}</h4>
        <p className="font-template">Kelola data produk anda.</p>
        <hr className="text-slate-500" />
        <form onSubmit={formik.handleSubmit} className=" mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full col-span-2 sm:col-span-1">
              <FormControl
                label="Nama Produk"
                onChange={formik.handleChange}
                meta={formik.getFieldMeta("nama")}
                name="nama"
                control="input"
                max={150}
                placeholder="Masukan nama barang"
                value={formik.values.nama || ""}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1">
              <FormControl
                label="Stok Produk"
                onChange={formik.handleChange}
                meta={formik.getFieldMeta("stok")}
                name="stok"
                control="input"
                type="number"
                max={150}
                placeholder="Masukan stok barang"
                value={formik.values.stok || ""}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1">
              <FormControl
                label="Harga Beli"
                onChange={formik.handleChange}
                meta={formik.getFieldMeta("harga_beli")}
                name="harga_beli"
                control="input"
                type="number"
                placeholder="Masukan harga beli"
                value={formik.values.harga_beli || ""}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1">
              <FormControl
                label="Harga Jual"
                onChange={formik.handleChange}
                meta={formik.getFieldMeta("harga_jual")}
                name="harga_jual"
                control="input"
                type="number"
                placeholder="Masukan harga jual"
                value={formik.values.harga_jual || ""}
              />
            </div>
            <div className="w-full col-span-2 flex justify-center">
              <div className="max-w-[200px] w-full aspect-[10/12]">
                <FormControl
                  control="image"
                  name="foto"
                  rules={"JPG/PNG. Max 100KB"}
                  defaultValue={formik.values.foto || ""}
                  meta={formik.getFieldMeta("foto")}
                  onChange={(e) => {
                    let file = e.target.files[0];
                    if (file) {
                      if (
                        file.type !== "image/jpeg" &&
                        file.type !== "image/jpg" &&
                        file.type !== "image/png"
                      ) {
                        toast.error("Gambar harus berformat JPG/PNG");
                      } else if (file.size > 100000) {
                        toast.error("Ukuran gambar harus dibawah 100Kb");
                        formik.setFieldValue("foto", null);
                      } else {
                        toBase64(file).then((r) => {
                          formik.setFieldValue("foto", r);
                        });
                      }
                    } else {
                      formik.setFieldValue("foto", null);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <hr className="text-slate-500 mt-4" />
          <div className="mt-4 flex justify-end">
            <div className="flex gap-2">
              <button
                className="btn py-2 btn-outline"
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Batal
              </button>
              <button
                className="btn py-2  bg-blue-500 text-white"
                type="submit"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </ModalFrame>
  );
};

export default ModalAddProduct;
