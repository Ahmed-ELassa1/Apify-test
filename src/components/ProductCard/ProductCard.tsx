import React from "react";
import "./ProductCard.css";
import { IProductsData } from "../../pages/ProductList/ProductList";

function ProductCard(props: IProductsData) {
  return (
    <div className="product-card-container">
      <img src={props?.image} alt={props?.title} />
      <div className="product-card-details">
        <h3>
          <span>Title: </span>
          {props?.title}
        </h3>
        <p>
          <span>Desc: </span>
          {props?.description?.split(" ").slice(0, 4).join(" ")}...
        </p>
        <p>
          <span>Quantity: </span>
          {props?.quantity}
        </p>
        <p>
          <span>Price:</span>
          {props?.price}
        </p>
        <p>
          <span>Discount:</span> {props.discount}%
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
