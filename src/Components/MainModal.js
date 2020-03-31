import { Modal, Card } from "antd";
import React, { Component } from "react";
import { Col, Row } from "react-flexbox-grid";
import BarChart from "./BarChart";
import TweenOne from "rc-tween-one";
import ChildrenPlugin from "rc-tween-one/lib/plugin/ChildrenPlugin";
TweenOne.plugins.push(ChildrenPlugin);
class MainModal extends Component {
  render() {
    const { country } = this.props;
    let deathRate = (
      (parseInt(country.deaths) / parseInt(country.cases)) *
      100
    ).toFixed(2);
    let recoveredRate = (
      (parseInt(country.total_recovered) / parseInt(country.cases)) *
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
          width={900}
        >
          <div className="mainModal">
            <Row center="lg">
              <Col lg={12}>
                <Row center="lg">
                  <Col lg={6}>
                    <h1 className="country_name" >{country.country_name}</h1>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row center="lg">
              <Col lg="4">
                <Card className="recovery_rate" bordered={true}>
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
                        style={{ fontSize: 22 }}
                      >
                        0
                      </TweenOne>
                    </div>
                  </Col>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="death_rate" bordered={true}>
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
                      style={{ fontSize: 22 }}
                    >
                      0
                    </TweenOne>
                  </Col>
                </Card>
              </Col>

              <Col lg="4">
                <Card className="population_rate" bordered={true}>
                  <Col>
                    <h3>Critical Cases</h3>
                    <TweenOne
                      animation={{
                        Children: {
                          value: parseInt(country.serious_critical),
                          formatMoney: true
                        },
                        duration: 1000
                      }}
                      style={{ fontSize: 22 }}
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
