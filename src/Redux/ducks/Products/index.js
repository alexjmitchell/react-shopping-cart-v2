import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

const GET_PRODUCTS = "products/GET_PRODUCTS"
const GET_SIZES = "products/GET_SIZES"
const FILTER_SIZES = "products/FILTER_SIZES"

const inititalState = {
  products: [],
  display: [],
  sizes: []
}

export default (state = inititalState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload, display: action.payload }
    case GET_SIZES:
      return { ...state, sizes: action.payload }
    case FILTER_SIZES:
      return {
        ...state,
        display: state.products.filter(product => {
          return product.availableSizes.includes(action.payload)
        })
      }
    default:
      return state
  }
}

const getProducts = () => {
  return dispatch => {
    axios.get("/products").then(response => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      })
      dispatch(getSizes(response.data))
    })
  }
}

const getSizes = products => {
  let productArray = []

  products.forEach(product => {
    productArray = productArray.concat(product.availableSizes)
  })

  const unique = Array.from(new Set(productArray))

  return {
    type: GET_SIZES,
    payload: unique
  }
}

const filterSizes = size => {
  return {
    type: FILTER_SIZES,
    payload: size
  }
}

export const useProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector(appState => appState.productState.products)
  const display = useSelector(appState => appState.productState.display)
  const sizes = useSelector(appState => appState.productState.sizes)
  const filter = size => dispatch(filterSizes(size))

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return { products, display, sizes, filter }
}
