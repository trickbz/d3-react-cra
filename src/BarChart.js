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
    componentWillReceiveProps(nextProps) {
        this.generateMarkup(nextProps.config);
    },
    componentDidMount() {
        this.generateMarkup(this.props.config);
    },
    generateMarkup(config) {
        const {xKey, yKey, data, xAxisLabel, yAxisLabel} = config;
        const margin = {top: 20, right: 20, bottom: 50, left: 50},
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        const root = new ReactFauxDom.Element('div');
        const faux = this.connectFauxDOM(root, 'chart');
        const component = this;

        const svg = d3.select(faux)
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

        let rect = svg.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('height', 0)
            .attr('opacity', 0.1)
            .attr('class', 'bar')
            .attr('x', d => x(d[xKey]))
            .attr('width', x.bandwidth())
            .attr('y', d => y(0))
            .attr('height', d => height - y(0));


        rect.append('title')
            .text(d => `${d[xKey]}: ${d[yKey]}`);

        rect.transition()
            .duration(1000)
            .attr('opacity', 1)
            .attr('height', d => height - y(d[yKey]))
            .attr('y', d => y(d[yKey]));

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

        component.animateFauxDOM(1000);
    },

    render() {
        return (<div>{this.state.chart}</div>);
    }
});

export default BarChart;