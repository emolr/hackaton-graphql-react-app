import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { lazy } from "@loadable/component";
import Loading from "./components/loading";

const LazyLogin = lazy(() => import("./pages/login"));
const LazyHome = lazy(() => import("./pages/home"));

const isLoggedIn = false;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={Loading}>
            {isLoggedIn ? <LazyHome /> : <Redirect to="/login" />}
          </Suspense>
        </Route>
        <Route path="/login">
          <Suspense fallback={Loading}>
            <LazyLogin />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
