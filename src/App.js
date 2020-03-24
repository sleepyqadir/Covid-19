import { Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import "./App.css";
import { List, Avatar, Spin, Input } from "antd";

import SiteStatitic from "./Components/SiteStatitic";
import MainHeader from "./Components/MainHeader";

// import World from "./Components/WorldMap_1";
const { Search } = Input;
const { Header, Content } = Layout;

class App extends Component {
  componentDidMount() {
    fetch("http://127.0.0.1:8000/total_ratio").then(res => {
      res.json().then(data => {
        this.setState({
          isLoading: true,
          world_total_stats: data.data
        });
      });
    });
  }
  state = {
    isLoading: false,
    world_total_stats: {}
  };
  render() {
    const { world_total_stats, isLoading } = this.state;
    return isLoading ? (
      <Layout>
        <MainHeader last_update={world_total_stats.statistic_taken_at} />
        <Row gutter={8}>
          <Col span={18}>
            <Layout className="layout">
              <SiteStatitic world_total_stats={world_total_stats} />
            </Layout>
          </Col>
          <Col span={6}>
            <Layout>
              <Content></Content>
            </Layout>
          </Col>
        </Row>
      </Layout>
    ) : (
      <div className="example">
        <Spin />
      </div>
    );
  }
}

export default App;
