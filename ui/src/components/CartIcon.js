import { CiShoppingBasket } from "react-icons/ci";

import "../styles/CartIcon.css";


const CartIcon = props => {
  return (
    <div className="shopping-cart-container">
      <span className="quantity-badge position-absolute start-50 translate-middle badge rounded-pill">{props.value}</span>
      <CiShoppingBasket className="shopping-cart-icon" role="img" aria-label="Shopping cart icon"/>
    </div>
  );
};

export default CartIcon;
