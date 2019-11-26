import React from "react"
import "../styles/App.css"
import MainPage from "./MainPage"
import { BrowserRouter as Router, Route } from "react-router-dom"

const App = props => {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
    </Router>
  )
}

export default App
