import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapData } from "../utils/mapData";
import { latlong } from "../utils/latLong";
import { Row, Col } from "react-flexbox-grid";

am4core.useTheme(am4themes_animated);
class WorldMap_1 extends Component {
  componentDidMount() {
    const result = this.props.countries
      .map(val => {
        let temp = {};
        for (let iterator of mapData) {
          if (val.country_name === iterator.name) {
            temp = { ...val, ...iterator };
            return temp;
          }
        }
      })
      .filter(val => {
        return val !== undefined;
      });
    console.log(result);
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4maps.MapChart);

    // Add lat/long information to data
    for (var i = 0; i < result.length; i++) {
      result[i].latitude = latlong[result[i].id].latitude;
      result[i].longitude = latlong[result[i].id].longitude;
    }

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart.homeZoomLevel = 0;
    chart.padding(20, 20, 20, 20);

    // Grid
    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.fitExtent = false;
    // Background
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      "#9cd3db"
    );
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    chart.deltaLongitude = 20;
    chart.deltaLatitude = -20;

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;

    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color("#a6e156");

    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = result;
    imageSeries.dataFields.value = "cases";

    var imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.nonScaling = true;

    var circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.3;
    circle.fill = am4core.color("#871400");
    circle.strokeOpacity = 0;
    circle.fillOpacity = 0.75;
    circle.propertyFields.strokeWidth = 30;
    circle.tooltipText = "{name}: [bold]{value}[/]";

    imageSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 4,
      max: 30,
      dataField: "value"
    });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  state = {
    countries: []
  };
  render() {
    return (
      <Row>
        <Col lg={12}>
          <Row center="lg">
            <Col xs={10}>
              <div
                id="chartdiv"
                style={{ width: "100%", height: "500px" }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default WorldMap_1;
