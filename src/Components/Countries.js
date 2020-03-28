import React, { Component } from "react";
import { Layout, Menu, Dropdown, Button, Modal } from "antd";
import { List, Avatar } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";
import BarChart from "./BarChart";
import MainModal from "./MainModal";
const { Content } = Layout;
class Countries extends Component {
  componentDidMount() {
    fetch("http://127.0.0.1:8000/").then(res => {
      res.json().then(data => {
        this.setState({
          countries: data.data
        });
      });
    });
  }

  handleMenuClick = e => {
    this.setState({
      type: e.key
    });
  };
  state = {
    countries: [],
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
    const { countries, type, modalCountry, modalVisible } = this.state;
    const { query } = this.props;
    const filteredCountries =
      query === ""
        ? countries
        : countries.filter(c => {
            return c.country_name
              .toLowerCase()
              .includes(query.toLowerCase().trim());
          });
    const list = filteredCountries.map(item => {
      return (
        <List.Item key={item.country_name} className={type}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://img.icons8.com/color/48/000000/${item.country_name
                  .toLowerCase()
                  .replace(/ /g, "-")}-circular.png`}
              />
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
              <div>
                {" "}
                <h3 className="update_time">
                  Total Territories : {countries.length}{" "}
                  <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: "50px" }}>
                      <RadarChartOutlined />
                    </Button>
                  </Dropdown>
                </h3>
              </div>
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
