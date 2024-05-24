import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import OrderConfirmationItem from "./OrderConfirmationItem";

describe("OrderConfirmationItem", () => {
  const product = {
    painting_id: "12345",
    name: "Beautiful Landscape",
    product_type: "Painting",
    quantity: 2,
    price: 150.00
  };

  test("renders product details correctly", () => {
    render(<OrderConfirmationItem product={product} />);

    const imagePath = `${process.env.PUBLIC_URL}/images/low_res/${product.painting_id}.jpg`;

    expect(screen.getByAltText(`Painting: ${product.name}`)).toHaveAttribute("src", imagePath);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.product_type)).toBeInTheDocument();
    expect(screen.getByText(`Quantity: ${product.quantity}`)).toBeInTheDocument();
    expect(screen.getByText("£300.00")).toBeInTheDocument();
  });

  test("calculates the total price correctly", () => {
    render(<OrderConfirmationItem product={product} />);

    const totalPrice = `£${(product.price * product.quantity).toFixed(2)}`;
    expect(screen.getByText(totalPrice)).toBeInTheDocument();
  });
});
