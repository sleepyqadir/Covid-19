import React, { Component } from "react";
import Chart from "chart.js";
class BarChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const { country } = this.props;
    console.log(country.cases);
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["Effected", "Deaths", "Recovered", "Citical"],
        datasets: [
          {
            label: [],
            data: [
              parseInt(country.cases.replace(/[~%&\\;:"',<>?#\s]/g, "")),
              parseInt(country.deaths.replace(/[~%&\\;:"',<>?#\s]/g, "")),
              parseInt(
                country.total_recovered.replace(/[~%&\\;:"',<>?#\s]/g, "")
              ),
              parseInt(
                country.serious_critical.replace(/[~%&\\;:"',<>?#\s]/g, "")
              )
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
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
