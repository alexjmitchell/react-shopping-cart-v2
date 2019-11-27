import React from "react"
import "../styles/MainPage.css"
import { useProducts, useCart } from "../hooks"

const MainPage = props => {
  const { display, sizes, filter } = useProducts()
  const { open, addItem } = useCart()

  const handleAdd = (event, product) => {
    event.preventDefault()
    addItem(product)
    open()
  }
  return (
    <div className="main-container">
      <h4>Sizes:</h4>
      <div className="buttons">  
        {sizes.map((size, i) => (
          <button
            key={`size-button-${i}`}
            onClick={event => filter(size)}
            className="size-buttons"
          >
            {size}
          </button>
        ))}
      </div>
      {console.log(display.length)}
      <h5 className="products-length">{display.length} Product(s) Found</h5>
      <div className="products-container">
        {display.map((product, i) => {
          const {
            isFreeShipping,
            sku,
            title,
            price,
            installments,
            currencyFormat: currency
          } = product

          const dollars = price.toString().split(".")[0]
          const cents = price
            .toFixed(2)
            .toString()
            .split(".")[1]

          return (
            <div key={`product-${i}`} className="product">
              {isFreeShipping ? (
                <div className="shipping">Free Shipping</div>
              ) : (
                ""
              )}
              <img
                src={`/assets/${sku}_1.jpg`}
                alt={title}
                className="product-image"
              />
              <h3 className="title">{title}</h3>
              <hr />
              <div className="price">
                <p>
                  {currency}
                  <span className="dollar">{dollars}</span>.{cents}
                </p>
                <div>
                  {installments ? (
                    <p className="installments">
                      {" "}
                      or {installments} x{(price / installments).toFixed(2)}
                    </p>
                  ) : (
                    <div className="installments">
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="add-to-cart"
                onClick={event => handleAdd(event, product)}
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MainPage
