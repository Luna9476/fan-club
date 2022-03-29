import React, { Component } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Material from "@amcharts/amcharts5/themes/Material"
import { Card, Container } from "react-bootstrap";

export default class Pool extends Component {
    componentDidMount() {

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

        // Define data
        var data = [
            {
                name: "Monica",
                steps: 45688,
                pictureSettings: {
                    src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg"
                }
            },
            {
                name: "Joey",
                steps: 35781,
                pictureSettings: {
                    src: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg"
                }
            },
            {
                name: "Ross",
                steps: 25464,
                pictureSettings: {
                    src: "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg"
                }
            },
            {
                name: "Phoebe",
                steps: 18788,
                pictureSettings: {
                    src: "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg"
                }
            },
            {
                name: "Rachel",
                steps: 15465,
                pictureSettings: {
                    src: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg"
                }
            },
            {
                name: "Chandler",
                steps: 11561,
                pictureSettings: {
                    src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
                }
            }
        ];

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
                min: am5.color(0xe5dc36),
                max: am5.color(0x5faa46),
                target: series.columns.template,
                key: "fill"
            },
            {
                dataField: "valueX",
                min: am5.color(0xe5dc36),
                max: am5.color(0x5faa46),
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
