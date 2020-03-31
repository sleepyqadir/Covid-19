import { Layout } from "antd";
import { Row, Col } from "react-flexbox-grid";
import "antd/dist/antd.css";
import React, { Component } from "react";
import "./App.css";
import Logo from "./imgs/logo_blue.png";
import SiteStatitic from "./Components/SiteStatitic";
import MainHeader from "./Components/MainHeader";
import Countries from "./Components/Countries";
import WorldMap from "./Components/WorldMap";

// import World from "./Components/WorldMap_1";

class App extends Component {
  componentDidMount() {
    Promise.all([
      fetch("http://127.0.0.1:8000/total_ratio"),
      fetch("http://127.0.0.1:8000/")
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        this.setState({
          world_total_stats: res1.data,
          countries: res2.data,
          isLoading: true
        });
      });
  }
  state = {
    isLoading: false,
    world_total_stats: {},
    query: "",
    Countries: []
  };
  onHandleChange = e => {
    this.setState({
      query: e.target.value
    });
  };
  render() {
    const { world_total_stats, isLoading, countries } = this.state;
    return isLoading ? (
      <Layout>
        <MainHeader
          last_update={world_total_stats.statistic_taken_at}
          onHandleChange={this.onHandleChange}
        />
        <Row>
          <Col lg={9}>
            <Layout className="layout">
              <SiteStatitic world_total_stats={world_total_stats} />
              <div className="world_map">
                <WorldMap countries={countries} />
              </div>
            </Layout>
          </Col>
          <Col lg={3}>
            <Layout>
              <Countries query={this.state.query} countries={countries} />
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
