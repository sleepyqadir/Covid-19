import React, { Component } from "react";
import Logo from "../imgs/logo_white.png";
import { Layout, Input } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { GithubOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { Search } = Input;
class MainHeader extends Component {
  render() {
    console.log(this.props.last_update);
    return (
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      >
        <Row between="lg">
          <Col xs={12} lg={4}>
            <Row>
              <Col xs={4} lg={2}>
                <img src={Logo} className="main_logo" alt="Covid-19" />
              </Col>
              <Col xs={4} lg={8}>
                <h1 className="main_logo_heading">COVID-19</h1>
              </Col>
            </Row>
          </Col>
          <Col lg={4}>
            <Row end="lg">
              <Col>
                <h3 className="update_time">
                  Last Update : {this.props.last_update}
                </h3>
              </Col>
            </Row>
          </Col>
          <Col lg={3}>
            <Row center="lg">
              <Col lg="6">
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                  className="search_input hidden-sm"
                  onChange={this.props.onHandleChange}
                />
              </Col>

              <GithubOutlined />
            </Row>
          </Col>
        </Row>
      </Header>
    );
  }
}
export default MainHeader;
