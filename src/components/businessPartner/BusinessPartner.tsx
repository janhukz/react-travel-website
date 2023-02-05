import React from 'react'
import { Divider, Row, Col, Typography } from 'antd'
import styles from './BusinessPartner.moudule.css'
import businessPartner1 from '../../assets/images/facebook-807588_640.png'
import businessPartner2 from '../../assets/images/follow-826033_640.png'
import businessPartner3 from '../../assets/images/microsoft-80658_640.png'
import businessPartner4 from '../../assets/images/icon-720944_640.png'

const companies = [
  { src: businessPartner1, title: 'Facebook' },
  { src: businessPartner2, title: 'Ins' },
  { src: businessPartner3, title: 'Microsoft' },
  { src: businessPartner4, title: 'Youtube' }
]

export const BusinessPartner: React.FC = () => {
  return (
    <div className={styles.content}>
      <Divider orientation="left">
        {<Typography.Title level={3}>合作企业</Typography.Title>}
      </Divider>
      <Row>
        {companies.map((c, index) => (
          <Col span={6} key={'bussiness-partner-' + index}>
            <img
              src={c.src}
              alt={c.title}
              style={{
                width: '80%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
