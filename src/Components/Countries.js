import React, { Component } from "react";
import { Layout, Menu, Dropdown, Button, Tooltip, Input } from "antd";
import { List, Avatar } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";
import MainModal from "./MainModal";
import { Row, Col } from "react-flexbox-grid";
import { mapData } from "../utils/mapData";
const { Content } = Layout;
const { Search } = Input;
class Countries extends Component {
  handleMenuClick = e => {
    this.setState({
      type: e.key
    });
  };
  state = {
    type: "total_cases",
    modalVisible: false,
    modalCountry: {}
  };
  setModal1Visible = (val, country = {}) => {
    this.setState({
      modalVisible: val,
      modalCountry: country
    });
  };
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="total_cases" className="level_1_bg">
          Total Cases
        </Menu.Item>
        <Menu.Item key="total_deaths" className="level_3_bg">
          Total Deaths
        </Menu.Item>
        <Menu.Item key="total_recovered" className="level_2_bg">
          Total Recoverd
        </Menu.Item>
      </Menu>
    );
    const { type, modalCountry, modalVisible } = this.state;
    const { query, countries } = this.props;
    const result = countries
      .map(val => {
        let temp = {};
        for (let iterator of mapData) {
          if (val.country_name === iterator.name) {
            temp = { ...val, ...iterator };
            return temp;
          }
        }
        return val;
      })
      .sort(function(a, b) {
        return type === "total_cases"
          ? parseInt(b.cases.replace(/[~%&\\;:"',<>?#\s]/g, "")) -
              parseInt(a.cases.replace(/[~%&\\;:"',<>?#\s]/g, ""))
          : type === "total_deaths"
          ? parseInt(b.deaths.replace(/[~%&\\;:"',<>?#\s]/g, "")) -
            parseInt(a.deaths.replace(/[~%&\\;:"',<>?#\s]/g, ""))
          : parseInt(b.total_recovered.replace(/[~%&\\;:"',<>?#\s]/g, "")) -
            parseInt(a.total_recovered.replace(/[~%&\\;:"',<>?#\s]/g, ""));
      });
    const filteredCountries =
      query === ""
        ? result
        : result.filter(c => {
            return c.country_name
              .toLowerCase()
              .includes(query.toLowerCase().trim());
          });
    console.log(result);
    const list = filteredCountries.map(item => {
      return (
        <Tooltip placement="topLeft" title={"Click to see stats"}>
          <List.Item key={item.country_name} className={type}>
            <List.Item.Meta
              avatar={
                item.id !== undefined ? (
                  <Avatar
                    src={require(`../imgs/free-flag-icons-96px/96px/${item.id}.png`)}
                  />
                ) : (
                  <Avatar />
                )
              }
              title={<h4>{item.country_name}</h4>}
              onClick={() => {
                this.setModal1Visible(true, item);
              }}
            />
            {type === "total_cases" ? (
              <div className="level_1_bg cases">{item.cases} C</div>
            ) : type === "total_deaths" ? (
              <div className="level_3_bg cases">{item.deaths} D</div>
            ) : (
              <div className="level_2_bg cases">{item.total_recovered} R</div>
            )}
          </List.Item>
        </Tooltip>
      );
    });

    return (
      <div>
        <MainModal
          modalVisible={modalVisible}
          setModal1Visible={this.setModal1Visible}
          country={modalCountry}
        />
        <Content>
          <List
            bordered={true}
            className="country_list"
            header={
              <Row around="xs">
                <Col>
                  <h3 className="update_time">
                    Total Territories : {countries.length}
                  </h3>
                </Col>
                <Col>
                  <Dropdown overlay={menu}>
                    <Button>
                      <RadarChartOutlined />
                    </Button>
                  </Dropdown>
                </Col>
                <Col>
                  <Search
                    placeholder="Search Country"
                    onSearch={value => console.log(value)}
                    style={{ width: "80vw", marginTop: "10px" }}
                    className="search_input hidden-lg"
                    onChange={this.props.onHandleChange}
                  />
                </Col>
              </Row>
            }
          >
            {list}
          </List>
        </Content>
      </div>
    );
  }
}
export default Countries;
