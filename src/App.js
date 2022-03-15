import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Cryptotable from "./Components/Cryptotable";
import SingleCoin from "./Components/SingleCoin";
import "./App.css";
function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
        <Route exact path='/'> <Navbar /></Route>
        <Route exact path='/'>  <Hero /></Route>
        <Route exact path='/'> <Cryptotable/></Route>
        <Route  path='/SingleCoin/:id' component={SingleCoin}/>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
