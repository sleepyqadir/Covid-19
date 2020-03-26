import React, { Component } from "react";
import { Modal } from "antd";
import BarChart from "./BarChart";
class MainModal extends Component {
  render() {
    console.log(this.props.setModal1Visible);
    return (
      <div>
        <Modal
          visible={this.props.modalVisible}
          title="Title"
          onCancel={() => {
            this.props.setModal1Visible(false);
          }}
          footer={[]}
        >
          <BarChart />
        </Modal>
      </div>
    );
  }
}

export default MainModal;
