import React, { Component } from "react";
import Chart from "chart.js";
class BarChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: ["Jan"],
        datasets: [
          {
            label: "Cases",
            data: [86]
          },
          {
            label: "Deaths",
            data: [86]
          },
          {
            label: "Recovered",
            data: [86]
          },
          {
            label: "Critical",
            data: [86]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default BarChart;
