<template>
    <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU.js";

const data = [
  {"date":"2020-07-01","visits":213},
  {"date":"2020-07-02","visits":249},
  {"date":"2020-07-03","visits":179},
  {"date":"2020-07-04","visits":170},
  {"date":"2020-07-05","visits":184},
  {"date":"2020-07-06","visits":202},
  {"date":"2020-07-07","visits":198},
  {"date":"2020-07-08","visits":168},
  {"date":"2020-07-09","visits":176},
  {"date":"2020-07-10","visits":171},
  {"date":"2020-07-11","visits":190},
  {"date":"2020-07-12","visits":154},
  {"date":"2020-07-13","visits":246},
  {"date":"2020-07-14","visits":250},
  {"date":"2020-07-15","visits":227},
  {"date":"2020-07-16","visits":140},
  {"date":"2020-07-17","visits":170},
  {"date":"2020-07-18","visits":125},
  {"date":"2020-07-19","visits":106},
  {"date":"2020-07-20","visits":207},
  {"date":"2020-07-21","visits":222},
  {"date":"2020-07-22","visits":198},
  {"date":"2020-07-23","visits":204},
  {"date":"2020-07-24","visits":213},
  {"date":"2020-07-25","visits":145},
  {"date":"2020-07-26","visits":166},
  {"date":"2020-07-27","visits":163},
  {"date":"2020-07-28","visits":135},
  {"date":"2020-07-29","visits":45}
]

export default {
    mounted() {
        this.initChart()
    },
    beforeUnmount() {
        this.root.dispose();
    },
    methods: {
        initChart() {
            const root = am5.Root.new("chartdiv"); 
            
            root.locale = am5locales_ru_RU;
            
            const myTheme = am5.Theme.new(root);

            myTheme.rule("ColorSet").set("colors", [
                am5.color(0x994df7),
            ]);
            myTheme.rule("AxisTick").setAll({
                visible: false
            });
            myTheme.rule("Grid").setAll({
                strokeOpacity: 0
            });
            myTheme.rule("Grid", ["base"]).setAll({
                strokeOpacity: 1
            });

            root.setThemes([
                am5themes_Animated.new(root),
                myTheme
            ]);


            const chart = root.container.children.push( 
                am5xy.XYChart.new(root, {
                    panY: false,
                    wheelY: "zoomX",
                    layout: root.verticalLayout,
                    maxTooltipDistance: 0
                }) 
            );


            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    extraTooltipPrecision: 1,
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );


            const xAxis = chart.xAxes.push(
                am5xy.DateAxis.new(root, {
                    baseInterval: { timeUnit: "day", count: 1 },
                    renderer: am5xy.AxisRendererX.new(root, {})
                })
            );
            xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

            function createSeries(name, field) {
                let series = chart.series.push( 
                    am5xy.LineSeries.new(root, { 
                        name: name,
                        xAxis: xAxis, 
                        yAxis: yAxis, 
                        valueYField: field, 
                        valueXField: 'date',
                        tooltip: am5.Tooltip.new(root, {})
                    }) 
                );
                
                series.bullets.push(function() {
                    return am5.Bullet.new(root, {
                        sprite: am5.Circle.new(root, {
                            radius: 5,
                            fill: series.get("fill"),
                            shadowColor: am5.color(0x7062bc),
                            shadowBlur: 8,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowOpacity: 0.5
                        })
                    });
                });

                series.fills.template.set("fillGradient", am5.LinearGradient.new(root, {
                    stops: [{
                        color: am5.color(0xe6c8fa),
                    }, {
                        color: am5.color(0xe6c8fa)
                    }],
                    rotation: 90
                }));

                series.fills.template.setAll({
                    visible: true,
                    fillOpacity: 1
                });

                series.strokes.template.set("strokeWidth", 2);

                series.data.setAll(data.map(el => {return {'date': new Date(el.date).getTime(), 'visits': el.visits}}));
                
                series.get("tooltip").label.set("text", "{valueX.formatDate()}\nпосещения: {valueY}")
            }
            createSeries("Series", "visits");

            chart.set("cursor", am5xy.XYCursor.new(root, {
                behavior: "zoomXY",
                xAxis: xAxis
            }));
            
            let cursor = chart.get("cursor");

            cursor.lineX.setAll({
                visible: false
            });

            cursor.lineY.setAll({
                visible: false
            });
        },
    }
}
</script>

<style scoped>
#chartdiv { width: 100%; height: 100%; }
</style>