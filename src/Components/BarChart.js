import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class BarChart extends Component {
  componentDidUpdate() {
    const { country } = this.props;
    am4core.useTheme(am4themes_animated);
    // Create chart instance

    var chart = am4core.create("chartdiv2", am4charts.PieChart);
    console.log(this.state.country);
    // Add data
    chart.data = [
      {
        name: "Cases",
        value: country.cases
      },
      {
        name: "Deaths",
        value: country.deaths
      },
      {
        name: "Critical",
        value: country.serious_critical
      },
      {
        name: "Recovered",
        value: country.total_recovered
      }
    ];
    chart.colors.list = [
      am4core.color("#333333"),
      am4core.color("#000000"),
      am4core.color("#FF6F91"),
      am4core.color("#FF9671")
    ];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "name";

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#123344");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // Add a legend
    chart.legend = new am4charts.Legend();
  }
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    // Create chart instance
    var chart = am4core.create("chartdiv2", am4charts.PieChart);
    const { country } = this.state;
    // Add data
    chart.data = [
      {
        name: "Cases",
        value: country.cases
      },
      {
        name: "Deaths",
        value: country.deaths
      },
      {
        name: "Critical",
        value: country.serious_critical
      },
      {
        name: "Recovered",
        value: country.total_recovered
      }
    ];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "name";

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(40);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#123344");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // Add a legend
    chart.legend = new am4charts.Legend();
  }
  state = {
    country: this.props.country
  };
  render() {
    return (
      <div>
        <div id="chartdiv2"></div>
      </div>
    );
  }
}

export default BarChart;
