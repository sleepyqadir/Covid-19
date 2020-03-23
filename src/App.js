import { ArrowDownOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row, Statistic } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import "./App.css";
import { List, message, Avatar, Spin } from "antd";
import SiteStatitic from "./Components/SiteStatitic";
import World from "./Components/WorldMap_1";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  componentDidMount() {
    fetch("http://127.0.0.1:8000/covid19Stats").then(res => {
      res.json().then(data => {
        const countriesWithProvince = data.data.covid19Stats.filter(c => {
          return c.province !== "";
        });
        const countriesWithOutProvince = data.data.covid19Stats.filter(c => {
          return c.province === "";
        });

        const awp = [];
        function red(total, val) {
          return total + val.confirmed;
        }
        console.log(data.data.covid19Stats.reduce(red, 0));
        for (const iteratorJ of countriesWithProvince) {
          let flag = true;
          for (const iteratorI of awp) {
            if (iteratorI.country === iteratorJ.country) {
              flag = false;
              if (iteratorI.confirmed !== iteratorJ.confirmed) {
                iteratorI.confirmed += iteratorJ.confirmed;
              }
            }
          }
          if (flag) {
            awp.push(Object.assign(iteratorJ));
          }
        }
        console.log(awp);
        this.setState({
          countriesWithProvince,
          countriesWithOutProvince,
          data: [...countriesWithOutProvince, ...awp],
          lastupdate: data.data.lastupdate
        });
      });
    });
  }
  state = {
    lastupdate: "",
    countriesWithProvince: [],
    countriesWithOutProvince: [],
    data: []
  };

  render() {
    const {
      data,
      countriesWithProvince,
      countriesWithOutProvince
    } = this.state;
    return (
      <Layout>
        <Row gutter={8}>
          <Col span={16}>
            <Layout>
              <Header
                className="site-layout-sub-header-background"
                style={{ padding: 0 }}
              ></Header>
              <Col>
                <SiteStatitic data={data} />
              </Col>
            </Layout>
          </Col>
          <Col span={8}>
            <Layout>
              <Header
                className="site-layout-sub-header-background"
                style={{ padding: 0 }}
              ></Header>
              <Content>
                <Row gutter={2}>
                  <Col span={12}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{"hello"}</a>}
                        description={"hello"}
                      />
                      <div>Content</div>
                    </List.Item>
                  </Col>
                  <Col span={12}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{"hello"}</a>}
                        description={"hello"}
                      />
                      <div>Content</div>
                    </List.Item>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default App;
