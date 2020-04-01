import { Card, Layout, Badge } from "antd";
import TweenOne from "rc-tween-one";
import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import ChildrenPlugin from "rc-tween-one/lib/plugin/ChildrenPlugin";
const { Content } = Layout;

TweenOne.plugins.push(ChildrenPlugin);
class SiteStatitic extends Component {
  render() {
    const { world_total_stats } = this.props;
    const {
      total_cases,
      total_deaths,
      total_recovered,
      new_cases,
      new_deaths
    } = world_total_stats;
    console.log(world_total_stats);
    return (
      <div>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-statistic-demo-card">
            <Row center="xs">
              <Col lg="4" xs="4">
                <Card className="level_1_bg level_1_card" bordered={true}>
                  <Col>
                    <h3>
                      TOTAL CASES
                      <Badge
                        count={5000 + "+"}
                        overflowCount={parseInt(
                          new_cases.replace(/[~%&\\;:"',<>?#\s]/g, "")
                        )}
                        style={{
                          marginLeft: "30px",
                          backgroundColor: "#2f54eb"
                        }}
                        className="hidden-sm"
                      ></Badge>
                    </h3>
                    <div>
                      <TweenOne
                        animation={{
                          Children: {
                            value: parseInt(
                              total_cases.replace(/[~%&\\;:"',<>?#\s]/g, "")
                            ),
                            formatMoney: true
                          },
                          duration: 3000
                        }}
                        style={{ fontSize: "1.5rem" }}
                      >
                        0
                      </TweenOne>
                    </div>
                  </Col>
                </Card>
              </Col>
              <Col lg="4" xs="4">
                <Card className="level_3_bg level_3_card" bordered={true}>
                  <Col>
                    <h3>
                      TOTAL DEATHS
                      <Badge
                        count={1000 + "+"}
                        overflowCount={parseInt(
                          new_deaths.replace(/[~%&\\;:"',<>?#\s]/g, "")
                        )}
                        style={{
                          marginLeft: "30px",
                          backgroundColor: ""
                        }}
                        className="hidden-sm"
                      ></Badge>
                    </h3>
                    <TweenOne
                      animation={{
                        Children: {
                          value: parseInt(
                            total_deaths.replace(/[~%&\\;:"',<>?#\s]/g, "")
                          ),
                          formatMoney: true
                        },
                        duration: 3000
                      }}
                      style={{ fontSize: "1.5rem" }}
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>

              <Col lg="4" xs="4">
                <Card className="level_2_bg level_2_card" bordered={true}>
                  <Col>
                    <h3>TOTAL RECOVERED</h3>
                    <TweenOne
                      animation={{
                        Children: {
                          value: parseInt(
                            total_recovered.replace(/[~%&\\;:"',<>?#\s]/g, "")
                          ),
                          formatMoney: true
                        },
                        duration: 3000
                      }}
                      style={{ fontSize: "1.5rem" }}
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
