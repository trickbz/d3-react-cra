import React from 'react';
import ReactFauxDom from 'react-faux-dom';
import * as d3 from 'd3';

class FauxAnimationSandbox extends React.Component {
    render() {
        const root = new ReactFauxDom.Element('div');
        const rects = [10, 12, 30];
        const rectSide = 40;

        const svg = d3.select(root)
            .append('svg')
            .attr('width', 400)
            .attr('height', 300);

            svg.selectAll('rect')
                .data(rects)
                .enter()
                .append('rect')
                .attr('width', rectSide)
                .attr('height', d => d * 5)
                .attr('x', (d, i) => rectSide * i)
                .attr('y', 0);

        return root.toReact();
    }
}

export default FauxAnimationSandbox;