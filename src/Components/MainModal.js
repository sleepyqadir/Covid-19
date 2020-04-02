import { Modal, Card } from "antd";
import React, { Component } from "react";
import { Col, Row } from "react-flexbox-grid";
import BarChart from "./BarChart";
import TweenOne from "rc-tween-one";
import ChildrenPlugin from "rc-tween-one/lib/plugin/ChildrenPlugin";
TweenOne.plugins.push(ChildrenPlugin);
class MainModal extends Component {
  render() {
    const country = this.props.country.cases
      ? this.props.country
      : {
          cases: "0",
          deaths: "0",
          total_recovered: "0",
          serious_critical: "0"
        };
    console.log(country, "xxxxxxxxxxxxxxxx");
    let deathRate = (
      (parseInt(country.deaths.replace(/[~%&\\;:"',<>?#\s]/g, "")) /
        parseInt(country.cases.replace(/[~%&\\;:"',<>?#\s]/g, ""))) *
      100
    ).toFixed(2);
    let recoveredRate = (
      (parseInt(country.total_recovered.replace(/[~%&\\;:"',<>?#\s]/g, "")) /
        parseInt(country.cases.replace(/[~%&\\;:"',<>?#\s]/g, ""))) *
      100
    ).toFixed(2);
    return (
      <div>
        <Modal
          visible={this.props.modalVisible}
          onCancel={() => {
            this.props.setModal1Visible(false);
          }}
          footer={[]}
          width={1000}
        >
          <div className="mainModal">
            <Row center="xs">
              <Col lg={12}>
                <Row center="xs">
                  <Col lg={10}>
                    {country.id !== undefined ? (
                      <img
                        src={require(`../imgs/free-flag-icons-96px/96px/${country.id}.png`)}
                        alt={country.id}
                      />
                    ) : (
                      <img alt={country.id} />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row center="xs">
              <Col lg="4" xs="4">
                <Card className="recovery_rate stats_card" bordered={true}>
                  <Col>
                    <h3>Recovery Rate</h3>
                    <div>
                      <TweenOne
                        animation={{
                          Children: {
                            value: recoveredRate,
                            formatMoney: true
                          },
                          duration: 1000
                        }}
                        className="level_value"
                      >
                        0
                      </TweenOne>
                    </div>
                  </Col>
                </Card>
              </Col>
              <Col lg="4" xs="4">
                <Card className="death_rate stats_card" bordered={true}>
                  <Col>
                    <h3>Death Rate</h3>
                    <TweenOne
                      animation={{
                        Children: {
                          value: deathRate,
                          formatMoney: true
                        },
                        duration: 1000
                      }}
                      className="level_value"
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>
              <Col lg="4" xs="4">
                <Card className="population_rate stats_card" bordered={true}>
                  <Col>
                    <h3>Critical Cases</h3>
                    <TweenOne
                      animation={{
                        Children: {
                          value: parseInt(
                            country.serious_critical.replace(
                              /[~%&\\;:"',<>?#\s]/g,
                              ""
                            )
                          ),
                          formatMoney: true
                        },
                        duration: 1000
                      }}
                      className="level_value"
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <BarChart country={country} />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MainModal;
