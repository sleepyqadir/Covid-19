import React, { Component } from "react";
import Logo from "../imgs/logo_white.png";
import { Layout, Row, Col, Input } from "antd";
const { Header } = Layout;
const { Search } = Input;

class MainHeader extends Component {
  render() {
    console.log(this.props.last_update);
    return (
      <div>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Row gutter={12}>
            <Col span={1}>
              <img src={Logo} className="main_logo" alt="Covid-19" />
            </Col>
            <Col span={9}>
              <h1 className="main_logo_heading">COVID-19</h1>
            </Col>
            <Col span={9}>
              <h3 className="update_time">
                Last Update : {this.props.last_update}
              </h3>
            </Col>
            <Col span={4}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                className="search_input"
              />
            </Col>
          </Row>
        </Header>
      </div>
    );
  }
}
export default MainHeader;
