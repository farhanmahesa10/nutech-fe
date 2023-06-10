import React, { useEffect, useState } from "react";
import {
  MdLogout,
  MdOutlineDelete,
  MdOutlineEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import { FormControl, ServerSideLoading } from "../../components/atoms";
import {
  ModalAddProduct,
  ModalDialogConfirmation,
  Table,
} from "../../components/molecules";
import { IDR } from "../../helpers/globalHelpers";
import useProducts from "../../services/useProducts";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { withAuth } from "../../components/hocs";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const {
    reqLoading,
    products,
    initProducts,
    addProduct,
    deleteProduct,
    setProductShow,
    updateProduct,
    productShow,
    pagination,
  } = useProducts();
  const [crudType, setCrudType] = useState("Tambah");
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddProductOpen, setModalAddProductOpen] = useState(false);
  const [lastKeyword, setLastKeyword] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { keyword: "" },
    onSubmit: (values) => {
      setLastKeyword(values.keyword);
      initProducts(values.keyword);
    },
  });

  useEffect(() => {
    initProducts();
  }, []);

  const tableData = {
    thead: [
      {
        Header: "#",
        accessor: "",
        sortable: true,
        colWidth: "5%",
        Cell: ({ row: { original, index } }) => {
          return index + 1;
        },
      },
      {
        Header: "Nama Barang",
        accessor: "nama",
        sortable: true,
        colWidth: "25%",
      },
      {
        Header: "Foto",
        accessor: "foto",
        sortable: true,
        colWidth: "10%",
        Cell: ({ row: { original, index } }) => {
          return (
            <img
              src={original.foto}
              alt="products"
              className="w-[80px] aspect-[10/12] object-cover"
            />
          );
        },
      },
      {
        Header: "Harga Beli",
        accessor: "harga_beli",
        sortable: true,
        colWidth: "20%",
        Cell: ({ row: { original, index } }) => {
          return <p> {IDR.format(original.harga_beli)}</p>;
        },
      },
      {
        Header: "Harga Jual",
        accessor: "harga_jual",
        sortable: true,
        colWidth: "20%",
        Cell: ({ row: { original, index } }) => {
          return <p> {IDR.format(original.harga_jual)}</p>;
        },
      },
      {
        Header: "Action",
        accessor: "id",
        sortable: true,
        colWidth: "25%",
        Cell: ({ row: { original, index } }) => {
          return (
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-outline btn p-2 border-yellow-400 bg-yellow-400"
                onClick={async () => {
                  setCrudType("Ubah");
                  setProductShow(original);
                  setModalAddProductOpen(true);
                }}
              >
                <MdOutlineEdit className="" />
              </button>

              <button
                type="button"
                className="btn-outline btn p-2 border-red-400 bg-red-400"
                onClick={() => {
                  setProductShow(original);
                  setModalDeleteOpen(true);
                }}
              >
                <MdOutlineDelete className="text-white" />
              </button>
            </div>
          );
        },
      },
    ],
    tbody: products || [],
  };

  return (
    <>
      <div className=" wrapper mt-4 border-b pb-2 border-slate-500">
        <div className="container">
          <div className="flex wrapper justify-between">
            <div>
              <h4 className="font-h4">FARHAN.</h4>
            </div>
            <div>
              <button
                className="btn py-2 btn-outline gap-2"
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("refreshToken");
                  navigate("/login");
                }}
              >
                Logout <MdLogout />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <div className="relative">
        {reqLoading && <ServerSideLoading fixCenter />}
      </div>
      <ModalAddProduct
        title={crudType + " Produk"}
        open={modalAddProductOpen}
        setOpen={setModalAddProductOpen}
        onSubmit={async (values) => {
          if (crudType === "Tambah") {
            await addProduct(values);
          } else if (crudType === "Ubah") {
            await updateProduct(values);
          }
          setModalAddProductOpen(false);
        }}
        defaultValue={productShow}
      />
      <ModalDialogConfirmation
        open={modalDeleteOpen}
        title="Hapus Produk"
        onCancel={() => {
          setModalDeleteOpen(false);
        }}
        onConfirm={async () => {
          await deleteProduct(productShow.id);
          setModalDeleteOpen(false);
        }}
        desc={
          <>
            Apakah anda yakin akan menghapus product{" "}
            <span className="font-bold whitespace-nowrap truncate">
              "{productShow?.nama}"
            </span>
            ?
          </>
        }
        setOpen={setModalDeleteOpen}
      />
      <div className="wrapper">
        <div className="container my-[40px]">
          <h5 className="font-h5 my-4">Kelola Data Produk</h5>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <form onSubmit={formik.handleSubmit} className="order-2 sm:order-1">
              <FormControl
                name="keyword"
                onChange={formik.handleChange}
                control="search"
                placeholder="cari nama barang"
              />
            </form>
            <button
              onClick={() => {
                setCrudType("Tambah");
                setProductShow(null);
                setModalAddProductOpen(true);
              }}
              className="btn bg-blue-500 text-white py-2 order-1 sm:order-2"
            >
              Tambah produk baru
            </button>
          </div>
          <div className="mt-4 ">
            <Table
              data={tableData}
              pagination={pagination}
              onPageClick={(page) => {
                initProducts(lastKeyword, page);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
