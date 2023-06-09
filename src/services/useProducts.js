import React, { useCallback, useState } from "react";
import { DESTROY, GET, POST, PUT } from "../configs/api/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productShow, setProductShow] = useState(null);

  const [pagination, setPagination] = useState({
    next_page: 0,
    prev_page: 0,
    current_page: 0,
    total_page: 0,
  });

  const [reqLoading, setReqLoading] = useState(false);
  const initProducts = useCallback(async (keyword = "", page = 1) => {
    setReqLoading(true);
    try {
      const result = await GET(
        `/products?order=desc&page=${page}&limit=5&nama=${keyword}`
      );

      let total_page = Math.ceil(result.data.total / 5);
      let newPagination = {
        next_page: total_page > result.data.page ? true : false,
        prev_page: result.data.page - 1,
        current_page: result.data.page,
        total_page,
      };
      setPagination(newPagination);
      setProducts(result.data.data);
    } catch (error) {}
    setReqLoading(false);
  }, []);

  const addProduct = useCallback(async (values) => {
    setReqLoading(true);
    try {
      const result = await POST("/products", values);
      initProducts();
    } catch (error) {}
  }, []);

  const updateProduct = useCallback(async (values) => {
    setReqLoading(true);
    try {
      const result = await PUT(`/products/${values.id}`, values);
      initProducts();
    } catch (error) {}
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setReqLoading(true);
    setReqLoading(true);
    try {
      const result = await DESTROY(`/products/${id}`);
      initProducts();
    } catch (error) {}
  }, []);

  return {
    products,
    reqLoading,
    initProducts,
    addProduct,
    deleteProduct,
    productShow,
    setProductShow,
    updateProduct,
    pagination,
  };
};

export default useProducts;
