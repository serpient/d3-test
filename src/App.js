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
    var dataset = [5, 10, 15, 20, 25, 36, 72, 100];
    d3.select("body").selectAll("p")
      .data(dataset)
      .enter()
      .append("p")
      .text((d) => { return d })
  }
  render() {
    return (
      <div className="App" onClick={() => this.appendNewNodes()}>
        <p>Tester 0</p>
        <p>Tester 1</p>
        <p>Tester 2</p>
        <p>Tester 3</p>
        <p>Tester 4</p>
      </div>
    );
  }
}

export default App;
