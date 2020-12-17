import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ListsPage from "./components/Lists/ListsPage";
import Schedule from "./components/Schedule/Schedule";
import Settings from "./components/Settings/Settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/lists"
            render={(props) => <ListsPage {...props} isAuthed={this.props} />}
          ></Route>
          <Route
            exact
            path="/schedule"
            render={(props) => <Schedule {...props} isAuthed={this.props} />}
          ></Route>
          <Route
            exact
            path="/settings"
            render={(props) => <Settings {...props} isAuthed={this.props} />}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
