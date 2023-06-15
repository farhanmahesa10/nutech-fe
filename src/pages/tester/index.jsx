import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { FormControl } from "../../components/atoms";
import { Table } from "../../components/molecules";
import { IDR } from "../../helpers/globalHelpers";

const Tester = () => {
  const [apiData, setApiData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const url = "https://spe-academy.spesolution.net/api/recruitment";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer o7Ytbt9XQLI3PgtebJfKSXKEf0XHU74Y",
    };

    axios
      .get(url, { headers })
      .then((response) => {
        // Tangani respons yang diterima
        const totalPrice = response.data.reduce(
          (accumulator, item) => accumulator + item.product.price,
          0
        );
        setTotalPrice(totalPrice);
        setApiData(response.data);
      })
      .catch((error) => {
        // Tangani kesalahan
        console.error(error);
      });
  }, []);

  const data = [
    {
      type: "type 1",
      model: "lamborgini",
      price: 200000000,
      image: "https://placehold.co/200x150",
      quantity: 9,
      stok: 8,
    },
    {
      type: "type 1",
      model: "lamborgini",
      price: 200000000,
      image: "https://placehold.co/200x150",
      quantity: 9,
      stok: 6,
    },
    {
      type: "type 1",
      model: "lamborgini",
      price: 200000000,
      image: "https://placehold.co/200x150",
      quantity: 9,
      stok: 6,
    },
  ];
  const [time, setTime] = useState("");
  // console.log(time.current);
  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("HH:mm:ss"));
    }, 1000);
  }, []);
  return (
    <div className="wrapper">
      <div className="container">
        {/* <Table
          data={tableData}
          // pagination={pagination}
          // onPageClick={(page) => {
          //   initProducts(lastKeyword, page);
          // }}
        /> */}

        <table className="w-full">
          <thead className="bg-[#111111] text-white">
            <tr>
              <th>PRODUCT</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.map((r, i) => {
              return <ProductListTable data={r} key={"data-" + i} />;
            })}
          </tbody>
          <tfoot className="bg-[#111111] text-white">
            <tr>
              <th colSpan={3} className="text-end">
                Total : {totalPrice}
              </th>
            </tr>
          </tfoot>
        </table>
        <br />
        <div className="w-[400px] bg-gradient-to-l from-[#FC00FF] to-[#00DBDE] overflow-hidden  z-10">
          <div className="w-full h-[200px] bg-[#111111] border-2 rounded-[8px] border-[#EEEEEE] rotate-[-30deg] flex items-end relative bottom-[120px] ">
            <span className="text-[#00FF00] pl-3 absolute rotate-[90deg] -left-14 top-20 font-xs">
              {moment().format("YYYY-MMM-DD")} {time || "00:00:00"}
            </span>
            <span className="text-[#00FF00] pl-3">{"< SPE / FRONTEND >"}</span>
          </div>
        </div>

        <br />
        <br />
        <br />

        <div className="w-[300px] h-[200px] bg-gradient-to-l from-[#FC00FF] to-[#00DBDE]  lg:bg-[#111111] lg:bg-none border-2 rounded-[8px] border-[#EEEEEE] flex items-center justify-end flex-col ">
          <p className="text-[#00FF00] pl-3 hidden lg:block">
            {moment().format("YYYY-MMM-DD")} {time || "00:00:00"}
          </p>
          <p className="text-[#00FF00] pl-3 hidden lg:block">
            {"< SPE / FRONTEND >"}
          </p>
        </div>
        <br />
        <br />
        <br />

        <br />
        <br />
      </div>
    </div>
  );
};

const ProductListTable = ({ data }) => {
  return (
    <tr className="text-center">
      <td>
        <div className="flex gap-2 mt-2">
          <img src={data.product.media_url} className="w-[200px]" />
          <div className="text-start">
            <p className="text-blue-500">{data.product.code}</p>
            <p className=" font-lg">{data.product.name}</p>
            <p className="font-sm text-gray-500">
              {IDR.format(data.product.price)}
            </p>
          </div>
        </div>
      </td>
      <td className="">
        <div className="flex justify-center">
          <div className="w-[80px]">
            <FormControl
              control="input"
              type="number"
              defaultValue={data.quantity}
            />
          </div>
        </div>
      </td>
      <td>{IDR.format(data.quantity * data.product.price)}</td>
    </tr>
  );
};

export default Tester;
