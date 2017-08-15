import React from 'react'

import { Layout } from 'antd'

import './index.less'

const { Footer } = Layout;

export default class CommonFooter extends React.Component {
  constructor () {
    super()
  }

  render () {

    return (
      <Footer>
         ©2015 Antd Layout
      </Footer>
    )
  }
}
