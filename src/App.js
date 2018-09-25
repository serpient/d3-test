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

    var aScale = d3.scaleSqrt() // example usage of sqrt scale for area of rendered circles
                  .domain([0, d3.max(dataset, (d) => { return d[1] })])
                  .range([0, 10]);

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
      .attr("r", (d) => { return aScale(d[1]) }); // scaling the circle size by area. 

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
  
    Example Usage:
    var scale = d3.scaleLinear()
                .domain([0.123, 4.567])
                .range([0, 500])
                .nice();

  `
  }
  timeScales = () => {
    //Width and height
    var w = 500;
    var h = 300;
    var padding = 40;

    var dataset = [];
    var xScale, yScale;  //Empty, for now

    //For converting strings to Dates
    var parseTime = d3.timeParse("%m/%d/%y");

    //For converting Dates to strings
    var formatTime = d3.timeFormat("%b %e");

    //Function for converting CSV values from strings to Dates and numbers
    var rowConverter = function (d) {
      return {
        Date: parseTime(d.Date),
        Amount: parseInt(d.Amount)
      };
    }

    //Load in the data
    d3.csv(require("./time_scale_data.csv"), rowConverter, function (data) {

      //Copy data into global dataset
      dataset = data;

      //Create scale functions
      xScale = d3.scaleTime()
        .domain([
          d3.min(dataset, function (d) { return d.Date; }),
          d3.max(dataset, function (d) { return d.Date; })
        ])
        .range([padding, w - padding]);

      yScale = d3.scaleLinear()
        .domain([
          d3.min(dataset, function (d) { return d.Amount; }),
          d3.max(dataset, function (d) { return d.Amount; })
        ])
        .range([h - padding, padding]);

      //Create SVG element
      var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      //Generate date labels first, so they are in back
      svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
          return formatTime(d.Date);
        })
        .attr("x", function (d) {
          return xScale(d.Date) + 4;
        })
        .attr("y", function (d) {
          return yScale(d.Amount) + 4;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "#bbb");

      //Generate circles last, so they appear in front
      svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return xScale(d.Date);
        })
        .attr("cy", function (d) {
          return yScale(d.Amount);
        })
        .attr("r", 2);
      
    });
  }
  axis = () => {
    let w = 600; // SVG width
    let h = 300; // SVH height
    var padding = 30;

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

    var aScale = d3.scaleSqrt() // example usage of sqrt scale for area of rendered circles
      .domain([0, d3.max(dataset, (d) => { return d[1] })])
      .range([0, 10]);

    var formatAsPercentage = d3.format(".1%"); // can be used with tickFormat to customize how the tick values are presented

    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  // .tickValues([ 0, 100, 250, 600]) // manual ticks
                  .ticks(5); // suggested amount of ticks
    
    var yAxis = d3.axisLeft()
                  .scale(yScale)
                  .ticks(5);
    

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
      .attr("r", (d) => { return aScale(d[1]) }); // scaling the circle size by area. 

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
  
    svg.append("g")
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (h - padding) + ')') // moves to the bottom
      .call(xAxis);
    
    svg.append("g")
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)') // moves to the bottom
      .call(yAxis);
  }
  transitioningData = () => {
    var w = 600;
    var h = 250;

    var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length)) // d3.range will generate an array of increasing numbers up to the value passed in. ex, [0,1,2,3,4,5..] etc
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset)])
                  .range([0, h]);

    var svg = d3.select('body')
                .append('svg')
                .attr('width', w)
                .attr('height', h);
    
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d,i) => { return xScale(i) })
      .attr('y', (d) => { return h - yScale(d) })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => { return yScale(d) })
      .attr("fill", function (d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
      });
    
    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text((d) => { return d })
        .attr('x', (d, i) => { return xScale(i) + (xScale.bandwidth() / 3) })
        .attr('y', (d) => { return h - yScale(d) + 14 })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
    
    d3.select('body')
      .on('click', () => {

        dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
          5, 10, 13, 19, 21, 25, 22, 18, 15, 13];

        // rebinds the updated data to all elemes
        svg.selectAll('rect')
            .data(dataset)
            // update visuals
            .transition() // adds the visual effect between old and new set
            .delay((d, i) => { return i / dataset.length * 1000 }) // delays transition. can delay all transition, or one at a time like in so
            .duration(500) // default is 1/4 section or 250 milliseconds. 
            .ease(d3.easeCubicInOut) // transition type. defaults to easeCubicInOut, aka starts fast and goes slower. 
            // .on('start', function() { // start/end of transitions controls
            //   d3.select(this)
            //     .attr('fill', 'magenta')
            // })
            .attr('y', (d) => { return h - yScale(d) })
            .attr('height', (d) => { return yScale(d) })
            .attr("fill", function (d) {
              return "rgb(0, 0, " + Math.round(d * 10) + ")";
            })
            // .on('end', function() {
            //   d3.select(this)
            //     .attr('fill', 'magenta')
            // })
        
        svg.selectAll('text')
          .data(dataset)
          .transition() // adds the visual effect between old and new set
          .delay((d, i) => { return i * 100 }) // delays transition
          .duration(500) // default is 1/4 section or 250 milliseconds.
          .attr('x', (d, i) => { return xScale(i) + (xScale.bandwidth() / 3) })
          .attr('y', (d) => { return h - yScale(d) + 14 })
       })
      
       // transition should only be used on values that already exist. dont use on not-existing values as it will cause unpredictable behavior
  }
  render() {
    return (
      <div className="App">
        <p>Click on this text to update the chart with new data values (once).</p>
        {this.transitioningData()}
      </div>
    );
  }
}

export default App;
