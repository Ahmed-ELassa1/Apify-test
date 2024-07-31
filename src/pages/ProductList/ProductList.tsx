import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./ProductList.css";
import { ProductService } from "../../Services/Product/ProductService";
import { IResponseData } from "../../Interfaces/GlobalInterfaces";
import { toast } from "react-toastify";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Pagination } from "antd";
import LoadingCard from "../../components/LoadingCard/LoadingCard";
export interface IProductsData {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
  image: string;
}

function ProductList() {
  /*__________________ States __________________ */
  const productInstance = new ProductService();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [productsTotal, setProductsTotal] = useState(100);
  const [productList, setProductList] = useState<IProductsData[]>([]);
  const LoadingSkeletonArray = Array.from(Array(8), (__, index) => index + 1); //  array for repeating the Skeleton Card when loading
  /*__________________ Handlers __________________ */
  const getAllProducts = useCallback(async () => {
    toast.loading("Loading ...");
    setIsLoading(true);
    const requestBody = {
      pageSize,
      pageNumber,
      minPrice,
      maxPrice,
    };
    const response = await productInstance.getAllProducts(requestBody);
    const data: IResponseData = response?.data?.data;
    if (response?.status === 200) {
      toast.dismiss();
      setProductList(data?.Product);
      setProductsTotal(data?.total);
    }
    setIsLoading(false);
  }, [pageSize, pageNumber]);
  useEffect(() => {
    // call the product endPoint on first init & everytime the pageNumber or pageSize changes
    getAllProducts();
  }, [pageSize, pageNumber]);

  function submitForm(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    getAllProducts();
  }

  function handlePagginationChange(pageNo: number, pageSize: number) {
    setPageNumber(pageNo);
    setPageSize(pageSize);
  }
  /*__________________ Return __________________ */
  return (
    <div className="products-list-page">
      <form onSubmit={submitForm} className="products-list-form">
        <div className="product-form-inputs-group">
          <label>min price</label>
          <input
            value={minPrice}
            type="number"
            name="minPrice"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinPrice(+e.target?.value)
            }
          />
        </div>
        <div className="product-form-inputs-group">
          <label>max price</label>
          <input
            value={maxPrice}
            type="number"
            name="maxPrice"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMaxPrice(+e.target?.value)
            }
          />
        </div>
        <button>Submit</button>
      </form>
      <div className="products-list-container">
        {isLoading ? (
          LoadingSkeletonArray.map((row, i) => {
            return <LoadingCard key={i} />;
          })
        ) : productList?.length > 0 ? (
          productList.map((card) => {
            return <ProductCard {...card} key={card.id} />;
          })
        ) : (
          <p className="product-no-data-text">No products to show</p>
        )}
      </div>
      <Pagination
        className="pagination-continer"
        pageSize={pageSize}
        total={productsTotal}
        defaultCurrent={1}
        defaultPageSize={10}
        onChange={(pageNo, pageSize) => {
          handlePagginationChange(+pageNo, +pageSize);
        }}
      />
    </div>
  );
}

export default ProductList;
