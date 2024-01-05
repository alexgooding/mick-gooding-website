import { CiShoppingBasket } from "react-icons/ci";

import "../styles/CartIcon.css";


const CartIcon = props => {
  return (
    <div className="shopping-cart-container">
      <span className="quantity-text position-absolute start-50 translate-middle badge rounded-pill bg-primary">{props.value}</span>
      <CiShoppingBasket className="shopping-cart-icon"/>
    </div>
  );
};

export default CartIcon;
