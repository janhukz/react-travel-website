import * as React from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import {
  Header,
  Footer,
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartner
} from '../../components'
import { productList1, productList2, productList3 } from './mockups'
import styles from './HomePage.module.css'
import sideImage1 from '../../assets/images/sider_2019_02-04-2.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_12-09.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import {
  FetchRecommendProductFailActionCreator,
  fetchRecommendProductStartActionCreator,
  fetchRecommendProductSuccessActionCreator
} from '../../redux/recommendProducts/recommendProductsActions'

const mapStateToprops = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStart: () => {
      dispatch(fetchRecommendProductStartActionCreator())
    },
    fetchSuccess: (data) => {
      dispatch(fetchRecommendProductSuccessActionCreator(data))
    },
    fetchFail: (error) => {
      dispatch(FetchRecommendProductFailActionCreator(error))
    }
  }
}

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToprops> &
  ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
  async componentDidMount() {
    this.props.fetchStart()
    try {
      const { data } = await axios.get(
        'http://123.56.149.216:8080/api/productCollections'
      )
      this.props.fetchSuccess(data)
    } catch (error) {
      this.props.fetchFail(error.message)
    }
  }

  render() {
    console.log(this.props.t)
    const { t } = this.props
    const { productList, loading, error } = this.props
    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%'
          }}
        />
      )
    }
    if (error) {
      return <div>网站出错：{error}</div>
    }
    return (
      <>
        <Header />
        {/* 页面内容 content */}
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage1}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          {/* 合作公司  businessPartner */}
          <BusinessPartner></BusinessPartner>
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = connect(
  mapStateToprops,
  mapDispatchToProps
)(withTranslation()(HomePageComponent))
