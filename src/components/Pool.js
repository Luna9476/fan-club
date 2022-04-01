import React, { Component } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Material from "@amcharts/amcharts5/themes/Material"
import { Card, Container } from "react-bootstrap";

import Web3ABI from '../pages/Web3';
let w3 = new Web3ABI();



export default class Pool extends Component {
    componentDidMount() {
        var stars=w3.GetStars1();
        const starRes=stars.then((result)=>{
            //return result[0];
            let starRes=result[0];
            console.log(starRes[0]);

            let root = am5.Root.new("chartdiv");

            root.setThemes([
                am5themes_Material.new(root)
            ]);

            var chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                    paddingLeft: 50,
                    paddingRight: 40
                })
            );
            
            console.log(starRes[0])
            var starData=new Array();
            for(var i=0;i<starRes.length;i++){
                starData.push({name: starRes[i][1],
                steps: starRes[i][4].toNumber(),
                // steps: 100,
                pictureSettings: {
                    src: starRes[i][3]
                }})
            }
            
            starData.sort((a,b)=>(a.steps>b.steps)?1:-1);
            console.log(starData);

            var data=starData;


            var yRenderer = am5xy.AxisRendererY.new(root, {});
            yRenderer.grid.template.set("visible", false);

            var yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "name",
                    renderer: yRenderer,
                    paddingRight: 40
                })
            );

            var xRenderer = am5xy.AxisRendererX.new(root, {});
            xRenderer.grid.template.set("strokeDasharray", [3]);

            var xAxis = chart.xAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    renderer: xRenderer
                })
            );

            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Income",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: "steps",
                    categoryYField: "name",
                    sequencedInterpolation: true,
                    calculateAggregates: true,
                    maskBullets: false,
                    tooltip: am5.Tooltip.new(root, {
                        dy: -30,
                        pointerOrientation: "vertical",
                        labelText: "{valueX}"
                    })
                })
            );

            series.columns.template.setAll({
                strokeOpacity: 0,
                cornerRadiusBR: 10,
                cornerRadiusTR: 10,
                cornerRadiusBL: 10,
                cornerRadiusTL: 10,
                maxHeight: 50,
                fillOpacity: 0.8
            });

            var currentlyHovered;

            series.columns.template.events.on("pointerover", function (e) {
                let dataItem = e.target.dataItem;
                if (dataItem && currentlyHovered != dataItem) {
                    if (currentlyHovered) {
                        var bullet = currentlyHovered.bullets[0];
                        bullet.animate({
                            key: "locationX",
                            to: 0,
                            duration: 600,
                            easing: am5.ease.out(am5.ease.cubic)
                        });
                    }
                    currentlyHovered = dataItem;
                    var bullet = dataItem.bullets[0];
                    bullet.animate({
                        key: "locationX",
                        to: 1,
                        duration: 600,
                        easing: am5.ease.out(am5.ease.cubic)
                    });
                }
            });

            series.columns.template.events.on("pointerout", function (e) {
                if (currentlyHovered) {
                    var bullet = currentlyHovered.bullets[0];
                    bullet.animate({
                        key: "locationX",
                        to: 0,
                        duration: 600,
                        easing: am5.ease.out(am5.ease.cubic)
                    });
                }
            });
            var circleTemplate = am5.Template.new({});

            series.bullets.push(function (root, series, dataItem) {
                var bulletContainer = am5.Container.new(root, {});
                var circle = bulletContainer.children.push(
                    am5.Circle.new(
                        root,
                        {
                            radius: 34
                        },
                        circleTemplate
                    )
                );

                var maskCircle = bulletContainer.children.push(
                    am5.Circle.new(root, { radius: 27 })
                );

                // only containers can be masked, so we add image to another container
                var imageContainer = bulletContainer.children.push(
                    am5.Container.new(root, {
                        mask: maskCircle
                    })
                );

                // not working
                var image = imageContainer.children.push(
                    am5.Picture.new(root, {
                        templateField: "pictureSettings",
                        centerX: am5.p50,
                        centerY: am5.p50,
                        width: 60,
                        height: 60
                    })
                );

                return am5.Bullet.new(root, {
                    locationX: 0,
                    sprite: bulletContainer
                });
            });

            // heatrule
            series.set("heatRules", [
                {
                    dataField: "valueX",
                    min: am5.color(0xfdc9e0),
                    max: am5.color(0xf471ab),
                    target: series.columns.template,
                    key: "fill"
                },
                {
                    dataField: "valueX",
                    min: am5.color(0xf471ab),
                    max: am5.color(0xfdc9e0),
                    target: circleTemplate,
                    key: "fill"
                }
            ]);



            series.data.setAll(data);
            yAxis.data.setAll(data);

            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineX.set("visible", false);
            cursor.lineY.set("visible", false);
            series.appear();
            cursor.events.on("cursormoved", function () {
                var dataItem = series.get("tooltip").dataItem;
                if (dataItem) {
                    if (dataItem && currentlyHovered != dataItem) {

                        currentlyHovered = dataItem;
                        var bullet = dataItem.bullets[0];
                        bullet.animate({
                            key: "locationX",
                            to: 1,
                            duration: 600,
                            easing: am5.ease.out(am5.ease.cubic)
                        });
                    }
                }
                else {
                    if (currentlyHovered) {
                        var bullet = currentlyHovered.bullets[0];
                        bullet.animate({
                            key: "locationX",
                            to: 0,
                            duration: 600,
                            easing: am5.ease.out(am5.ease.cubic)
                        });
                    }
                }
            })
            // chart.appear();
            this.root = root;
            })
        
    }

    handleHover(dataItem) {

    }

    componentWillUnmount() {
        if (this.root) {
            this.root.dispose();
        }
    }

    render() {
        return (
            <Container style={{margin: "30px"}}>
                <Card>
                    <Card.Title className="text-center"><h1 className = "header-font">Hall of Fame</h1></Card.Title>
                    <Card.Body>
                        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                    </Card.Body>
                </Card>
            </Container>

        );
    }
}
