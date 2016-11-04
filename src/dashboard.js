import React from 'react';
import DashboardMenu from './dashboard-menu';
import BarChart from './BarChart';
import config from './dashboard-config';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentConfig: config[0],
            caption: 'First'
        };
        this.barChartSourceChanged = this.barChartSourceChanged.bind(this);
    }

    barChartSourceChanged(config) {
        this.setState({
            currentConfig: config
        });
    }

    render() {
        return (
            <div>
                <DashboardMenu
                    barChartSourceChanged={this.barChartSourceChanged}
                    data={config}
                />
                <BarChart
                    width={400}
                    height={300}
                    config={this.state.currentConfig}
                />
            </div>
        )
    }
}

export default Dashboard;