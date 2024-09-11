import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../redux/hooks"; // 代码从store中剥离出来
import { useDispatch } from "react-redux";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import { jwtDecode, JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";
const { Search } = Input;

interface JwtPayload extends DefaultJwtPayload {
  iss: string;
}

export const Header: React.FC = () => {
  // 通过hooks方式进行路由
  const history = useHistory();
  const language = useSelector((state) => state.language.language); // 同时，对store中的数据也可动态获取相应数据

  console.log(language, "language");

  const languageList = useSelector((state) => state.language.languageList);

  // useDispatch hook输出就是dispatch函数本身，连接着的是store的分发函数action需要dispatch函数分发出去
  const dispatch = useDispatch();
  const menuClickHandler = (e) => {
    // action must be plain object
    if (e.key === "new") {
      // this.props.addLanguage('新语言', 'new_lang')
      dispatch(addLanguageActionCreator("新语言", "new_lang"));
    } else {
      // this.props.changeLanguage(e.key)
      dispatch(changeLanguageActionCreator(e.key));
    }
  };
  const { t } = useTranslation();
  const jwt = useSelector((s) => s.user.token);
  const [username, setUsername] = useState("");

  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwtDecode<JwtPayload>(jwt);
      setUsername(token.iss);
    }
  }, [jwt]);

  const OnLogOut = () => {
    dispatch(userSlice.actions.logOut()); // 小括号别忘记.这里是函数调用
    history.push("/");
  };
  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => (
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
                <Menu.Item key={"new"}>
                  {t("header.add_new_language")}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined></GlobalOutlined>}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>

          {jwt ? (
            <span className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button
                loading={shoppingCartLoading}
                onClick={() => history.push("shoppingCart")}
              >
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={OnLogOut}>{t("header.signOut")}</Button>
            </span>
          ) : (
            <span className={styles["button-group"]}>
              <Button onClick={() => history.push("register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => history.push("signin")}>
                {t("header.signin")}
              </Button>
            </span>
          )}
        </div>
      </div>

      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => history.push("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Search
          placeholder="请输入旅游目的地、主题、或关键字"
          className={styles["search-input"]}
          onSearch={(keywords) => {
            history.push("/Search/" + keywords);
          }}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
        <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
        <Menu.Item key="3"> {t("header.group")} </Menu.Item>
        <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
        <Menu.Item key="5"> {t("header.private")} </Menu.Item>
        <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
        <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
        <Menu.Item key="8"> {t("header.local")} </Menu.Item>
        <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
        <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
        <Menu.Item key="11"> {t("header.study")} </Menu.Item>
        <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
        <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
        <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
        <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  );
};
