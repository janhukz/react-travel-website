import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  addLanguageActionCreator,
  changeLanguageActionCreator
} from '../../redux/language/languageActions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// interface State extends LanguageState {}

const mapStateToprops = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    }
  }
}

type PropsType = RouteComponentProps & // react-router路由 props类型
  WithTranslation & // i18n proprs 类型
  ReturnType<typeof mapStateToprops> & //redux store 映射类型
  ReturnType<typeof mapDispatchToProps>

class HeaderComponent extends React.Component<PropsType> {
  // constructor(props) {
  //   super(props)
  //   const storeState = store.getState()
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   }
  //   store.subscribe(this.handleStoreChange)
  // }

  // handleStoreChange = () => {
  //   this.setState({
  //     language: store.getState().language,
  //     languageList: store.getState().languageList
  //   })
  // }

  menuClickHandler = (e) => {
    // action must be plain object
    if (e.key === 'new') {
      // const action = {
      //   type: 'add_new_language',
      //   payload: { code: 'new_lang', name: '新语言' }
      // }
      // 对action解耦
      // const action = addLanguageActionCreator('新语言', 'new_lang')
      // store.dispatch(action)

      // 处理新语言添加action
      this.props.addLanguage('新语言', 'new_lang')
    } else {
      // const action = {
      //   type: 'change_language',
      //   payload: e.key
      // }
      // const action = changeLanguageActionCreator(e.key)
      // store.dispatch(action)
      this.props.changeLanguage(e.key)
    }
  }
  render() {
    const { history, t } = this.props
    return (
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((l) => (
                    <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  ))}
                  <Menu.Item key={'new'}>
                    {t('header.add_new_language')}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined></GlobalOutlined>}
            >
              {this.props.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <span className={styles['button-group']}>
              <Button onClick={() => history.push('register')}>
                {t('header.register')}
              </Button>
              <Button onClick={() => history.push('signin')}>
                {t('header.signin')}
              </Button>
            </span>
          </div>
        </div>

        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push('/')}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>
              {t('header.title')}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder="请输入旅游目的地、主题、或关键字"
            className={styles['search-input']}
          ></Input.Search>
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key="1"> {t('header.home_page')} </Menu.Item>
          <Menu.Item key="2"> {t('header.weekend')} </Menu.Item>
          <Menu.Item key="3"> {t('header.group')} </Menu.Item>
          <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
          <Menu.Item key="5"> {t('header.private')} </Menu.Item>
          <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
          <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
          <Menu.Item key="8"> {t('header.local')} </Menu.Item>
          <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
          <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
          <Menu.Item key="11"> {t('header.study')} </Menu.Item>
          <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
          <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
          <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
          <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
          <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export const Header = connect(
  mapStateToprops,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)))
