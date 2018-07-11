/*
Plotly react
https://github.com/plotly/react-plotly.js#state-management
*/

import React from 'react';
import Plot from 'react-plotly.js';

class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        // get the plot data from props
        let xArrays = props['xArrays'];
        let yArrays = props['yArrays'];
        let plotColors = props['colors'];
        let plotModes = props['plot_modes'];
        let compiledPlotData = [];
        // iterate through the Arrays for plot data
        for (let xDataIter = 0; xDataIter < xArrays.length; xDataIter++) {
            let xData = xArrays[xDataIter];
            let yData = yArrays[xDataIter];
            let plotColor = plotColors[xDataIter];
            let plotMode = plotModes[xDataIter];
            compiledPlotData[xDataIter] = {};
            compiledPlotData[xDataIter]['type'] = 'scatter';
            if (plotColor !== undefined) {
                compiledPlotData[xDataIter]['marker'] = { 'color': plotColor };
            }
            if (plotMode !== undefined) {
                compiledPlotData[xDataIter]['mode'] = plotMode;
            }
            if (Array.isArray(xData)) {
                compiledPlotData[xDataIter]['x'] = xData;
            } else {
                compiledPlotData[xDataIter]['x'] = [];
            }
            if (Array.isArray(yData)) {
                compiledPlotData[xDataIter]['y'] = yData;
            } else {
                compiledPlotData[xDataIter]['y'] = [];
            }

        }
        this.state = { data: compiledPlotData, layout: { autosize: true } };
        this.state.plotComp = <Plot
            style={{ width: '100%', height: '100%', margin: '0px' }}
            data={this.state.data}
            layout={this.state.layout}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
        />
    }

    componentWillUnmount() {
        this.setState({ plotComp: <div></div> });
    }

    render() {
        return (
            <div>
                {/* <span>{JSON.stringify(this.state)}</span> */}
                {this.state.plotComp}
            </div>
        );
    }
}

export default ScatterPlot;