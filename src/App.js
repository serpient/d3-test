import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";

class App extends Component {
  randomlyChangeParagraphColors = () => {
    d3.selectAll("p").style("color", function () {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
  }
  computeDynamicFontSizes = () => {
    d3.selectAll('p')
      .data([4, 8, 15, 16, 23, 42])
      .style('font-size', function (d) { return d + "px"; });
  }
  addMoreNodesToMatchData = () => {
    d3.select("body")
      .selectAll("p")
      .data([4, 8, 15, 16, 23, 42, 64, 72, 100])
      .enter().append("p")
      .text(function (d) { return "I'm number " + d + "!"; })
  }
  fadeBackgroundToBlack = () => {
    d3.select('body').transition()
      .style("background-color", "black")
  }

  appendNewNodes = () => {
    var dataset = [100, 7, 5, 26, 11, 8, 25, 14, 23, 19,
      14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
      24, 18, 25, 9, 3];
    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", (d) => { return (d * 2) + "px"; });
  }
  createSVGs = () => {
    var svg = d3.select("body")
      .append("svg")
      .attr("width", 500)
      .attr("height", 50);

    var dataset = [5, 10, 15, 20, 25];

    var circles = svg.selectAll("circle")


      .data(dataset)
      .enter()
      .append("circle");
    circles.attr("cx", (d, i) => { return (i * 100) + 25 })
      .attr("cy", (d) => { return d / 2 })
      .attr("r", (d) => { return d })
      .attr("fill", "yellow")
      .attr("stroke", "orange")
      .attr("stroke-width", (d) => { return d / 2 })
  }
  makeBarChart = () => {
    var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

    let w = 500;
    let h = 100;
    var barPadding = 1;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", 500)
      .attr("height", 100);

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => { return i * (w / dataset.length) })
      .attr("y", (d) => { return h - d * 4 })
      .attr("width", w / dataset.length - barPadding)
      .attr('height', (d) => { return d * 4 })
      .attr("fill", (d) => { return "rgb(0,0," + Math.round(d * 10) + ")" });

    svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) => { return d })
      .attr("x", (d, i) => { return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2 })
      .attr("y", (d) => { return h - (d * 4) + 14 })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
  }
  makeScatterPlot = () => {
    let w = 500;
    let h = 100;
    var dataset = [
      [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
      [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
    ];

    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)

    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => { return d[0] })
      .attr("cy", (d) => { return d[1] })
      .attr("r", (d) => { return Math.sqrt(h - d[1]) }); // scaling the circle size by area. 

    svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) => { return d[0] + "," + d[1] })
      .attr("x", (d) => { return d[0] })
      .attr("y", (d) => { return d[1] })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "red")
  }
  makeScatterPlotWithScales = () => {
    let w = 600; // SVG width
    let h = 300; // SVH height
    var padding = 20;

    var dataset = [
      [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
      [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]
    ];

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => { return d[0] })]) // input
      .range([padding, w - 20 * 2]); // outputs

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => { return d[1] })])
      .range([h - padding, padding])

    var rScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => { return d[1] })])
      .range([2, 20])

    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)

    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => { return xScale(d[0]) })
      .attr("cy", (d) => { return yScale(d[1]) })
      .attr("r", (d) => { return rScale(d[1]) }); // scaling the circle size by area. 

    svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) => { return d[0] + "," + d[1] })
      .attr("x", (d) => { return xScale(d[0]) })
      .attr("y", (d) => { return yScale(d[1]) })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "red");

  `
  d3.scaleLinear() has several other handy methods that deserve a brief mention
  here:
  nice()
    This tells the scale to take whatever input domain that you gave to domain() and
    expand both ends to the nearest round value.From the D3 wiki: “For example,
    for a domain of[0.201479…, 0.996679…], a nice domain might be[0.2, 1.0].”
    This is useful for humans, who are not computers and find it hard to read num‐
    bers like 0.20147987687960267.
  rangeRound()
    Use rangeRound() in place of range(), and all values output by the scale will be
    rounded to the nearest whole number.This is useful if you want shapes to have
    exact pixel values, to avoid the fuzzy edges that could arise with antialiasing.
  clamp()
    By default, a linear scale can return values outside of the specified range.For
    example, if given a value outside of its expected input domain, a scale will return
    a number also outside of the output range.Calling clamp(true) on a scale, how‐
    ever, forces all output values to be within the specified range.This means exces‐
    sive values will be rounded to the range’s low or high value(whichever is
    nearest).
  `

  }
  render() {
    return (
      <div className="App">
        {this.makeScatterPlotWithScales()}
      </div>
    );
  }
}

export default App;
