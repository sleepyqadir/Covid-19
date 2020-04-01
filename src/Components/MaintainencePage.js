import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import data_maintenance from "../imgs/data_maintenance.svg";
class MaintenancePage extends Component {
  render() {
    return (
      <div>
        <Row center="lg">
          <Col lg="12">
            <Row center="lg">
              <Col lg="8">
                <img
                  src={data_maintenance}
                  alt="data_maintenance"
                  className="data_maintenance"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row center="lg">
          <Col lg="12">
            <Row center="lg">
              <Col lg="8">
                <h1>The Site is Under Maintenance , Please Visit Later</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MaintenancePage;
