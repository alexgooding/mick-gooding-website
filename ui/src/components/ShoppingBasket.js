import { CiShoppingBasket } from "react-icons/ci";

import "../styles/ShoppingBasket.css";


const ShoppingBasket = props => {
  return (
    <div className="shopping-basket-container">
      <span className="quantity-text position-absolute start-50 translate-middle badge rounded-pill bg-primary">{props.value}</span>
      <CiShoppingBasket className="shopping-basket-icon"/>
    </div>
  );
};

export default ShoppingBasket;
