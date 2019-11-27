import { useSelector, useDispatch } from "react-redux"

const GET_CART = "cart/GET_CART"
const ADD_TO_CART = "cart/ADD_TO_CART"
const OPEN_CART = "cart/OPEN_CART"
const CLOSE_CART = "cart/CLOSE_CART"
const TOGGLE_CART = "cart/TOGGLE_CART"
const CHANGE_QUANTITY = "cart/CHANGE_QUANTITY"

const initialState = {
  cart: [],
  show: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: action.payload }
    case ADD_TO_CART:
      return { ...state, cart: createCart(state.cart, action.payload) }
    case OPEN_CART:
      return { ...state, show: true }
    case CLOSE_CART:
      return { ...state, show: false }
    case TOGGLE_CART:
      return { ...state, show: !state.show }
    default:
      return state
  }
}

const createCart = (array, item) => {
  // checks cart array to see if the product selected exists, if not push it to the array.
  if (!array.find(product => product.id === item.id)) {
    array.push(item)
  }

  // mapping through the array and checking quantity, if it doesn't exist then make it equal to zero, else if the product selected exists add 1 to product quantity for that matching id.
  const cart = array.map(product => {
    if (!product.quantity) {
      product.quantity = 0
    }

    if (product.id === item.id) {
      product.quantity += 1
    }

    return product
  })

  // storing cart array to the windows local storage as a string to be used later.
  window.localStorage.setItem("cart", JSON.stringify(cart))

  return cart
}

const getCart = () => {
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  return {
    type: GET_CART,
    payload: cart
  }
}

const addToCart = item => {
  return {
    type: ADD_TO_CART,
    payload: item
  }
}

const openCart = () => {
  return {
    type: OPEN_CART
  }
}

const closeCart = () => {
  return {
    type: CLOSE_CART
  }
}

const toggleCart = () => {
  return {
    type: TOGGLE_CART
  }
}

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(appState => appState.cartState.cart)
  const visible = useSelector(appState => appState.cartState.show)
  const open = dispatch(openCart())
  const close = dispatch(closeCart())
  const toggle = dispatch(toggleCart())
  const addItem = item => dispatch(addToCart(item))
  const displayCart = dispatch(getCart())

  return { cart, visible, open, close, toggle, addItem, displayCart }
}
