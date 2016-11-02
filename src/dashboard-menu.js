import React from 'react';

const DashboardMenu = React.createClass({
  render() {
    return (
      <div>
        {this.props.data.map(d => {
          return (
            <button
              key={d.xAxisLabel}
              onClick={() => {
                this.props.barChartSourceChanged(d)
              }}
            >
              {d.name}
            </button>
          );
        })}
      </div>
    )
  }
});

export default DashboardMenu;