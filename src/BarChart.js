import React from 'react';
import * as d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';
import css from './bar-chart.css';

class BarChart extends React.Component {
    render() {

        const xKey = this.props.config.xKey;
        const yKey = this.props.config.yKey;
        const data = this.props.config.data;
        const xAxisLabel = this.props.config.xAxisLabel;
        const yAxisLabel = this.props.config.yAxisLabel;

        const margin = {top: 20, right: 20, bottom: 50, left: 50},
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;
        const root = new ReactFauxDom.Element('div');

        const svg = d3.select(root)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d[xKey]))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[yKey])])
            .range([height, 0]);

        svg.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d[xKey]))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d[yKey]))
            .attr('height', d => height - y(d[yKey]))
            .append('title')
            .text(d => `${d[xKey]}: ${d[yKey]}`);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append('text')
            .attr('transform', `translate(${width / 2}, ${height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text(xAxisLabel);

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (height / 2))
            .attr('y', 10 - margin.left)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text(yAxisLabel);

        return root.toReact();
    }
}

export default BarChart;