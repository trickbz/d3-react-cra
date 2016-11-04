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
            yScale
        }
    },
    generateInitialMarkup(config) {
        var barData = this.getDataFromConfig(config);
        const root = new ReactFauxDom.Element('div');
        const faux = this.connectFauxDOM(root, 'chart');

        const svg = d3.select(faux)
            .append('svg')
            .attr('width', barData.width + barData.margin.left + barData.margin.right)
            .attr('height', barData.height + barData.margin.top + barData.margin.bottom)
            .append('g')
            .attr("transform", `translate(${barData.margin.left}, ${barData.margin.top})`);

        let rect = svg.selectAll('rect')
            .data(barData.data)
            .enter().append('rect')
            .attr('height', 0)
            .attr('opacity', 0.1)
            .attr('class', 'bar')
            .attr('x', d => barData.xScale(d[barData.xKey]))
            .attr('width', barData.xScale.bandwidth())
            .attr('y', d => barData.yScale(0))
            .attr('height', d => barData.height - barData.yScale(0));


        rect.append('title')
            .text(d => `${d[barData.xKey]}: ${d[barData.yKey]}`);

        rect.transition()
            .duration(1000)
            .attr('opacity', 1)
            .attr('height', d => barData.height - barData.yScale(d[barData.yKey]))
            .attr('y', d => barData.yScale(d[barData.yKey]));

        svg.append('g')
            .attr('transform', `translate(0, ${barData.height})`)
            .call(d3.axisBottom(barData.xScale));

        svg.append('text')
            .attr('transform', `translate(${barData.width / 2}, ${barData.height + barData.margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text(barData.xAxisLabel);

        svg.append('g')
            .call(d3.axisLeft(barData.yScale));

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (barData.height / 2))
            .attr('y', 10 - barData.margin.left)
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text(barData.yAxisLabel);

        this.animateFauxDOM(1000);
    },
    updateMarkup(config) {
        const barData = this.getDataFromConfig(config);
        d3.selectAll('.bar')
            .data(barData.data)
            .transition()
            .duration(1000)
            .attr('opacity', 1)
            .attr('height', d => barData.height - barData.yScale(d[barData.yKey]))
            .attr('y', d => barData.yScale(d[barData.yKey]));
    },

    render() {
        return (<div>{this.state.chart}</div>);
    }
});

export default BarChart;