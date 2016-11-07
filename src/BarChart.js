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
    createSvg() {
        var barData = this.getDataFromConfig(this.props.config);
        const root = new ReactFauxDom.Element('div');
        const faux = this.connectFauxDOM(root, 'chart');
        const svg = d3.select(faux)
            .append('svg')
            .attr('width', barData.width + barData.margin.left + barData.margin.right)
            .attr('height', barData.height + barData.margin.top + barData.margin.bottom)
            .append('g')
            .attr("transform", `translate(${barData.margin.left}, ${barData.margin.top})`);

        svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0, ${barData.height})`);

        svg.append('g')
            .attr('class', 'axis y-axis');

        svg.append('text')
            .attr('class', 'axis-label x-axis-label')
            .attr('transform', `translate(${barData.width / 2}, ${0})`)
            .attr('dy', '-.5em')
            .style('text-anchor', 'middle');

        svg.append('text')
            .attr('class', 'axis-label y-axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (barData.height / 2))
            .attr('y', 10 - barData.margin.left)
            .attr('dy', '.75em')
            .attr('text-anchor', 'middle');

        d3.select("body")
            .append("div")
            .attr('class', 'bar-chart-tooltip')
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .text("a simple tooltip");

        return svg;
    },
    componentDidMount() {
        const svg = this.createSvg();
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this, svg);
        this.update(this.props.config, svg);
    },
    componentWillReceiveProps(svg, nextProps) {
        this.update(nextProps.config, svg);
    },
    getDataFromConfig(config) {
        const {xKey, yKey, data, xAxisLabel, yAxisLabel} = config;
        const margin = {top: 30, right: 20, bottom: 100, left: 50},
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
    update(config, svg) {
        var barData = this.getDataFromConfig(config);
        const duration = 1000;

        const bars = svg.selectAll('rect')
            .data(barData.data);

        bars
            .exit()
            .style('opacity', 1)
            .transition()
            .duration(duration)
            .style('opacity', 0)
            .attr('height', barData.height - barData.yScale(0))
            .attr('y', d => barData.yScale(0))
            .remove();

        bars
            .transition()
            .duration(duration)
            .attr('x', d => barData.xScale(d[barData.xKey]))
            .attr('width', barData.xScale.bandwidth())
            .attr('height', d => barData.height - barData.yScale(d[barData.yKey]))
            .attr('y', d => barData.yScale(d[barData.yKey]))
            .attr('fill', () => barData.color(Math.random()));

        bars
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', 'red')
            .attr('x', d => barData.xScale(d[barData.xKey]))
            .attr('y', d => barData.yScale(0))
            .attr('width', barData.xScale.bandwidth())
            .attr('height', barData.height - barData.yScale(0))
            .attr('fill', () => barData.color(Math.random()))
            .style('opacity', 0)
            .transition()
            .duration(duration)
            .attr('height', d => barData.height - barData.yScale(d[barData.yKey]))
            .attr('y', d => barData.yScale(d[barData.yKey]))
            .style('opacity', 1);

        const tooltip = d3.select('.bar-chart-tooltip');
        svg.selectAll('.bar')
            .on("mouseover", d => tooltip.style("visibility", "visible").text(d[barData.yKey]))
            .on("mousemove", d => {
                tooltip.style("top",
                    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d[barData.yKey])
            })
            .on("mouseout", () => tooltip.style("visibility", "hidden"));

        // x axis
        const xAxis = svg.select('.x-axis')
            .call(d3.axisBottom(barData.xScale).tickFormat(d => (d.length > 20 ? d.substr(0, 20) + '…': d)));

        // rotate x-axis tick labels
        xAxis.selectAll('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '1em')
            .attr('dx', '-1em')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        // x axis label
        svg.select('.x-axis-label')
            .text('')
            .transition()
            .duration(duration)
            .text(barData.xAxisLabel);

        // y axis
        svg.select('.y-axis')
            .call(d3.axisLeft(barData.yScale));

        // y axis label
        svg.select('.y-axis-label')
            .text(barData.yAxisLabel);

        this.animateFauxDOM(duration);
    },

    render() {
        return (<div>{this.state.chart}</div>);
    }
});

export default BarChart;