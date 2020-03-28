import { Col, Modal, Row, Statistic } from "antd";
import React, { Component } from "react";
import BarChart from "./BarChart";
class MainModal extends Component {
  render() {
    const { country } = this.props;
    console.log(country);
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
            <Row gutter={8}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Statistic
                      title="Recovered Rate"
                      value={recoveredRate}
                      suffix="%"
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Death Rate"
                      value={deathRate}
                      suffix="%"
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Cases Per 1m Population"
                      value={country.total_cases_per_1m_population}
                      suffix="in Million"
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
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
