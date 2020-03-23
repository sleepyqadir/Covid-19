import { Card, Col, Layout, Row, Avatar } from "antd";
import TweenOne from "rc-tween-one";
import React, { Component } from "react";
import { BugTwoTone } from "@ant-design/icons";

import ChildrenPlugin from "rc-tween-one/lib/plugin/ChildrenPlugin";
const { Content } = Layout;

const { Meta } = Card;

TweenOne.plugins.push(ChildrenPlugin);
class SiteStatitic extends Component {
  render() {
    const { data } = this.props;
    function redConfirmed(total, val) {
      return total + val.confirmed;
    }
    function redDeaths(total, val) {
      return total + val.deaths;
    }
    function redRecovered(total, val) {
      return total + val.recovered;
    }
    const confirmed = data.reduce(redConfirmed, 0);
    const deaths = data.reduce(redDeaths, 0);
    const recovered = data.reduce(redRecovered, 0);
    return (
      <div>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-statistic-demo-card">
            <Row gutter={16}>
              <Col span={8}>
                <Card className="level_1_bg" bordered={true}>
                  <Col>
                    <h4>
                      <BugTwoTone twoToneColor="#2f54eb" /> CONFIRMED
                    </h4>
                    <TweenOne
                      animation={{
                        Children: {
                          value: confirmed,
                          formatMoney: true
                        },
                        duration: 3000
                      }}
                      style={{ fontSize: 22 }}
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="level_3_bg" bordered={true}>
                  <Col>
                    <h4>
                      <BugTwoTone twoToneColor="#cf1322" /> DEATHS
                    </h4>
                    <TweenOne
                      animation={{
                        Children: {
                          value: deaths,
                          formatMoney: true
                        },
                        duration: 3000
                      }}
                      style={{ fontSize: 22}}
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>

              <Col span={8}>
                <Card className="level_2_bg" bordered={true}>
                  <Col>
                    <h4>
                      <BugTwoTone twoToneColor="#52c41a" /> RECOVERED
                    </h4>
                    <TweenOne
                      animation={{
                        Children: {
                          value: recovered,
                          formatMoney: true
                        },
                        duration: 3000
                      }}
                      style={{ fontSize: 22}}
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    );
  }
}
export default SiteStatitic;
