import React, { Component } from "react";
import { Col, Layout, Row } from "antd";
import { List, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroller";
const { Header, Content } = Layout;
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
  state = {
    countries: []
  };
  render() {
    const { countries } = this.state;
    console.log(countries);
    const list = countries.map(item => {
      return (
        <List.Item key={item.country_name}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://img.icons8.com/color/48/000000/${item.country_name
                  .toLowerCase()
                  .replace(/ /g, "-")}-circular.png`}
              />
            }
            title={<a href="https://ant.design">{item.country_name}</a>}
          />
          <div className="level_1_bg cases">{item.cases}</div>
        </List.Item>
      );
    });

    return (
      <div>
        <Content>
          <List
            bordered={true}
            className="country_list"
            header={<div>Header</div>}
          >
            {list}
          </List>
        </Content>
      </div>
    );
  }
}
export default Countries;
