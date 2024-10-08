import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import { FilterArea, ProductList } from "../../components/";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainlayout";

interface MatchParams {
  keywords: string;
}
export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productionSearch.loading);
  const error = useSelector((s) => s.productionSearch.error);
  const pagination = useSelector((s) => s.productionSearch.pagination);
  const productList = useSelector((s) => s.productionSearch.data);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }
  return (
    <MainLayout>
      {/* 分类过滤器*/}
      <div className={styles["product-list-container"]}>
        <FilterArea></FilterArea>
      </div>
      {/*产品列表*/}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
