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
      .data([ 4, 8, 15, 16, 23, 42])
      .style('font-size', function(d) { return d + "px"; });
  }
  addMoreNodesToMatchData = () => {
    d3.select("body")
      .selectAll("p")
      .data([4, 8, 15, 16, 23, 42, 64, 72, 100])
      .enter().append("p")
        .text(function(d) { return "I'm number " + d + "!"; })
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
      .style("height", (d) => { return (d*2) + "px"; });
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
    circles.attr("cx", (d, i) => { return (i * 100) + 25})
            .attr("cy", (d) => { return d / 2 })
            .attr("r", (d) => { return d })
            .attr("fill", "yellow")
            .attr("stroke", "orange")
            .attr("stroke-width", (d) => { return d / 2 })
  }
  
  render() {
    return (
      <div className="App" onClick={() => this.createSVGs()}>
        <p>Click Me</p>
      </div>
    );
  }
}

export default App;
