import styles from "./App.module.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from "./pages/";
import React, { useEffect } from "react";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  // 定义一个名为 routeComponent 的函数，用来判断是否应该渲染组件或重定向
  const routeComponent = (props) => {
    // 如果用户已通过身份验证（isAuthenticated 为 true），
    // 使用 React.createElement 渲染传入的组件，并将其余 props 传递给组件
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      // 如果用户未通过身份验证，重定向到登录页面（"/SignIn"）
      <Redirect to={{ pathname: "/SignIn" }}></Redirect>
    );
  };

  // 返回一个 Route 组件，其中的 render 属性指定了渲染逻辑（使用 routeComponent 函数）。
  // 将其他传入的属性（...rest）传递给 Route，以保证路由能正确匹配和传递
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
            path="/shoppingcart"
            isAuthenticated={jwt !== null}
            component={ShoppingCartPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/placeorder"
            isAuthenticated={jwt !== null}
            component={PlaceOrderPage}
          ></PrivateRoute>
          <Route render={() => <h1>404 Not Found!</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
