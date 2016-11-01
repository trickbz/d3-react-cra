import React from 'react';
import ReactFauxDom from 'react-faux-dom';

const AnimatedFauxComponent = React.createClass({
    mixins: [
        ReactFauxDom.mixins.core,
        ReactFauxDom.mixins.anim
    ],

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
});

export default AnimatedFauxComponent;