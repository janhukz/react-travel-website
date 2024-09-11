import styles from "./App.module.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
} from "./pages/";
import React, { useEffect } from "react";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/SignIn" }}></Redirect>
    );
  };
  return <Route render={routeComponent} {...rest}></Route>;
};

const App: React.FC = () => {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/signIn" component={SignInPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/detail/:touristRouterId" component={DetailPage}></Route>
          <Route path="/search/:keywords?" component={SearchPage}></Route>
          <PrivateRoute
            isAuthenticated={jwt !== null}
            component={ShoppingCartPage}
          ></PrivateRoute>
          <Route render={() => <h1>404 Not Found!</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
