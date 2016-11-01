import React from 'react';
import ReactFauxDom from 'react-faux-dom';
import * as d3 from 'd3';

const AnimatedFauxComponent = React.createClass({
    mixins: [ReactFauxDom.mixins.core, ReactFauxDom.mixins.anim],
    getInitialState: function () {
        return {}
    },
    componentDidMount() {
        var faux = this.connectFauxDOM('div', 'chart');
        var component = this;
        var svg = d3.select(faux).append('svg')
            .attr('width', 400)
            .attr('height', 300)
            .style('border', '1px solid black');

        var rect = svg.append('rect')
            .attr('width', 20)
            .attr('height', 20)
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', 'blue');

        rect.transition()
            .duration(2000)
            .attr('width', 150)
            .attr('height', 150);
        component.animateFauxDOM(2000);
        component.animateFauxDOM(2000);
    },
    render() {
        return (
            <div>
                {this.state.chart}
            </div>
        )
    }
});

export default AnimatedFauxComponent;