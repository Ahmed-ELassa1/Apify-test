import React, {
  ChangeEvent,
  ReactEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
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
const products: IProductsData[] = [
  {
    id: 1,
    title: "Classic White T-Shirt",
    description:
      "A comfortable and stylish white t-shirt made from 100% cotton.",
    price: 19.99,
    quantity: 100,
    discount: 10,
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    title: "Blue Denim Jeans",
    description: "Premium quality blue denim jeans with a modern fit.",
    price: 49.99,
    quantity: 50,
    discount: 15,
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    title: "Leather Jacket",
    description: "High-quality black leather jacket with a sleek design.",
    price: 99.99,
    quantity: 30,
    discount: 20,
    image: "https://example.com/images/leather-jacket.jpg",
  },
  {
    id: 4,
    title: "Running Shoes",
    description:
      "Lightweight and durable running shoes for all types of terrain.",
    price: 69.99,
    quantity: 200,
    discount: 25,
    image: "https://example.com/images/running-shoes.jpg",
  },
  {
    id: 5,
    title: "Black Dress",
    description: "Elegant black dress perfect for formal occasions.",
    price: 79.99,
    quantity: 80,
    discount: 30,
    image: "https://example.com/images/black-dress.jpg",
  },
  {
    id: 6,
    title: "Wool Scarf",
    description: "Warm and cozy wool scarf in a variety of colors.",
    price: 29.99,
    quantity: 150,
    discount: 5,
    image: "https://example.com/images/wool-scarf.jpg",
  },
  {
    id: 7,
    title: "Baseball Cap",
    description:
      "Stylish baseball cap with adjustable strap and embroidered logo.",
    price: 15.99,
    quantity: 300,
    discount: 10,
    image: "https://example.com/images/baseball-cap.jpg",
  },
  {
    id: 8,
    title: "Sunglasses",
    description: "UV-protected sunglasses with a sleek design.",
    price: 25.99,
    quantity: 120,
    discount: 15,
    image: "https://example.com/images/sunglasses.jpg",
  },
  {
    id: 9,
    title: "Fitness Tracker",
    description:
      "Water-resistant fitness tracker with heart rate monitoring and step counter.",
    price: 49.99,
    quantity: 75,
    discount: 20,
    image: "https://example.com/images/fitness-tracker.jpg",
  },
];

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
  const LoadingSkeletonArray = Array.from(Array(8), (__, index) => index + 1);
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
          products.map((card) => {
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
