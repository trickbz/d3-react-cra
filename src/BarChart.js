import React from 'react';
import * as d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';
import './bar-chart.css';

const BarChart = React.createClass({
    mixins: [
        ReactFauxDom.mixins.core,
        ReactFauxDom.mixins.anim
    ],
    getInitialState() {
        return {};
    },
    componentDidMount() {
        this.generateInitialMarkup(this.props.config);
    },
    componentWillReceiveProps(nextProps) {
        this.updateMarkup(nextProps.config);
    },
    getDataFromConfig(config) {
        const {xKey, yKey, data, xAxisLabel, yAxisLabel} = config;
        const margin = {top: 20, right: 20, bottom: 50, left: 50},
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        const xScale = d3.scaleBand()
            .domain(data.map(d => d[xKey]))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[yKey])])
            .range([height, 0]);

        // bar colors
        const color = d3.interpolateRgb('green', 'orange');

        return {
            xKey,
            yKey,
            data,
            xAxisLabel,
            yAxisLabel,
            margin,
            width,
            height,
            xScale,
            yScale,
            color
        }
    },
    generateInitialMarkup(config) {
        var barData = this.getDataFromConfig(config);
        const root = new ReactFauxDom.Element('div');
        const faux = this.connectFauxDOM(root, 'chart');

        // svg
        const svg = d3.select(faux)
            .append('svg')
            .attr('width', barData.width + barData.margin.left + barData.margin.right)
            .attr('height', barData.height + barData.margin.top + barData.margin.bottom)
            .append('g')
            .attr("transform", `translate(${barData.margin.left}, ${barData.margin.top})`);

        // bar
        let rect = svg.selectAll('rect')
            .data(barData.data)
            .enter().append('rect')
            .attr('height', 0) // 0 value for transition
            .attr('class', 'bar')
            .attr('x', d => barData.xScale(d[barData.xKey]))
            .attr('width', barData.xScale.bandwidth())
            .attr('y', d => barData.yScale(0)) // 0 value for transition
            .attr('height', d => barData.height - barData.yScale(0)) // 0 value for transition
            .attr('fill', () => barData.color(Math.random()));

        // tooltip
        rect.append('title')
            .text(d => `${d[barData.xKey]}: ${d[barData.yKey]}`);

        // bar transition from 0 to action values
        rect.transition()
            .duration(1000)
            .attr('height', d => barData.height - barData.yScale(d[barData.yKey]))
            .attr('y', d => barData.yScale(d[barData.yKey]));

        // x axis
        svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0, ${barData.height})`)
            .call(d3.axisBottom(barData.xScale));

        // x axis label
        svg.append('text')
            .attr('class', 'axis-label x-axis-label')
            .attr('transform', `translate(${barData.width / 2}, ${barData.height + barData.margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text(barData.xAxisLabel);

        // y axis
        svg.append('g')
            .attr('class', 'axis y-axis')
            .call(d3.axisLeft(barData.yScale));

        // y axis label
        svg.append('text')
            .attr('class', 'axis-label y-axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (barData.height / 2))
            .attr('y', 10 - barData.margin.left)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text(barData.yAxisLabel);

        this.animateFauxDOM(1000);
    },
    updateMarkup(config) {
        const duration = 1000;
        const barData = this.getDataFromConfig(config);

        // perform bar transition from previous values to new values
        d3.selectAll('.bar')
            .data(barData.data)
            .transition()
            .duration(duration)
            .attr('height', d => barData.height - barData.yScale(d[barData.yKey]))
            .attr('y', d => barData.yScale(d[barData.yKey]))
            .attr('fill', () => barData.color(Math.random()));

        // x-axis update
        d3.select('.x-axis')
            // TODO: Error if try to animate x-axis
            // .transition()
            // .duration(duration)
            .call(d3.axisBottom(barData.xScale));

        d3.select('.x-axis-label')
            .attr('opacity', 0)
            .transition()
            .duration(duration)
            .attr('opacity', 1)
            .text(barData.xAxisLabel);

        // y-axis update
        d3.select('.y-axis')
            // TODO: Error if try to animate y-axis
            // .transition()
            // .duration(duration)
            .call(d3.axisLeft(barData.yScale));

        d3.select('.y-axis-label')
            .attr('opacity', 0)
            .transition()
            .duration(duration)
            .attr('opacity', 1)
            .text(barData.yAxisLabel);
    },

    render() {
        return (<div>{this.state.chart}</div>);
    }
});

export default BarChart;