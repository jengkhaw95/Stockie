import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UserContext from "./Contexts/UserContext";
import WebLayout from "./Layout/WebLayout";
import Overview from "./Pages.js/Overview";
import Settings from "./Pages.js/Settings";
import Stocks from "./Pages.js/Stocks";
import Store from "./Pages.js/Store";
import Records from "./Pages.js/Records";

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <WebLayout>
          <Switch>
            <Route exact path="/">
              <Overview />
            </Route>
            <Route exact path="/stocks">
              <Stocks />
            </Route>
            <Route exact path="/records">
              <Records />
            </Route>
            <Route exact path="/store">
              <Store />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </WebLayout>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
