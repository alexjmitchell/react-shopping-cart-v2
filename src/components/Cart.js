import React from "react"
import "../styles/Cart.css"
import Icon from "../lib/Icon"
import { useCart } from "../hooks"

const Cart = props => {
  const { visible, toggle, cart, total, items, change } = useCart()

  const update = (event, id, quantity) => {
    event.preventDefault()
    change(id, quantity)
  }

  return (
    <div className={visible ? "cart open" : "cart"}>
      <div className="toggle" onClick={toggle}>
        {visible ? (
          <Icon icon="times" />
        ) : (
          <div>
            <Icon icon="shopping-cart" />
            <span>{items}</span>
          </div>
        )}
      </div>
      <div className="cart-title-display">
        <Icon icon="shopping-cart" />
        <span>{items}</span>
      </div>
      <div className="cart-products">
        {cart.map((product, i) => (
          <div key={`cart-product-${product.id}-${i}`} className="item">
            <img src={`/assets/${product.sku}_2.jpg`} alt={product.title} />
            <div className="cart-item-details">
              <p className="cart-item-title">{product.title}</p>
              <p>{product.style}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <div className="cart-item-price">
              <p>
                {product.currencyFormat}
                {product.price.toFixed(2)}
              </p>
              <button onClick={event => update(event, product.id, -1)}>
                -
              </button>
              <button onClick={event => update(event, product.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="subtotal">
        <div className="total">
          <h3>subtotal</h3>
          <p>${total}</p>
        </div>
        <button
          onClick={event => alert(`Checkout - Subtotal: ${total}`)}
          className="checkout"
        >
         Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
