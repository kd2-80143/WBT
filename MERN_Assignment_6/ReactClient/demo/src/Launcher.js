import Home from "./Home";
import About from "./About";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './common.css'
import {Link,Switch,Route} from "react-router-dom";

function Launcher() {
    return ( <div className="container">
                <div className="table table-responsive">
                <img src="http://localhost:3000/logo.jpeg" alt="Logo" className="logo"></img> 
                <hr></hr>
                <Link to="/home">Home</Link> {" | "}
                <Link to="/about">About</Link> {" | "}
                <Link to="/db">Dashboard</Link> {" | "}
                <hr></hr>

                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <Route exact path="/db" component={Dashboard}></Route>
                    <Route path="**" component={NotFound}></Route>
                </Switch>
                </div>
            </div> );
}

export default Launcher;

