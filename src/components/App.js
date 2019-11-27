import React from "react"
import "../styles/App.css"
import MainPage from "./MainPage"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Cart from './Cart'

const App = props => {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Cart />
    </Router>
  )
}

export default App
