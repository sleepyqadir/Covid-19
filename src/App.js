import { Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import "./App.css";
import Logo from "./imgs/logo_blue.png";

import SiteStatitic from "./Components/SiteStatitic";
import MainHeader from "./Components/MainHeader";
import Countries from "./Components/Countries";
import World from "./Components/WorldMap_1";
import WorldMap_1 from "./Components/WorldMap_1";

// import World from "./Components/WorldMap_1";

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
    world_total_stats: {},
    query: ""
  };
  onHandleChange = e => {
    this.setState({
      query: e.target.value
    });
  };
  render() {
    console.log(this.state.query);
    const { world_total_stats, isLoading } = this.state;
    return isLoading ? (
      <Layout>
        <MainHeader
          last_update={world_total_stats.statistic_taken_at}
          onHandleChange={this.onHandleChange}
        />
        <Row gutter={8}>
          <Col span={18}>
            <Layout className="layout">
              <SiteStatitic world_total_stats={world_total_stats} />
              <div className="world_map">
                <WorldMap_1 />
              </div>
            </Layout>
          </Col>
          <Col span={6}>
            <Layout>
              <Countries query={this.state.query} />
            </Layout>
          </Col>
        </Row>
      </Layout>
    ) : (
      <div className="loader">
        <img src={Logo} className="main_logo" alt="Covid-19" />
      </div>
    );
  }
}

export default App;
