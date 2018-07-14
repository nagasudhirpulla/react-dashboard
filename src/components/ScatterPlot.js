/*
Plotly react
https://github.com/plotly/react-plotly.js#state-management

Deep merge user config with default config
https://github.com/KyleAMathews/deepmerge
*/

import React from 'react';
import Plot from 'react-plotly.js';
import deepmerge from 'deepmerge';
import { equipProps } from '../utils/objectUtils'

class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.propsToCompState(props);
    }

    propsToCompState(props) {
        // get the plot data from props
        let xArrays = props['xArrays'];
        let yArrays = props['yArrays'];
        let plotColors = props['colors'];
        let plotModes = props['plot_modes'];
        let compiledPlotData = [];
        let traceNames = [];
        if (props.names !== undefined && props.names.constructor === Array) {
            traceNames = props.names;
        }
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
            if (traceNames[xDataIter] === undefined) {
                compiledPlotData[xDataIter]['name'] = props.y_headings[xDataIter];
            } else {
                compiledPlotData[xDataIter]['name'] = traceNames[xDataIter];
            }
        }
        const defLayout = {
            autosize: true,
            showlegend: true,
            legend: { "orientation": "h" }
        };
        props = equipProps(props, ['layout', 'config', 'style']);
        const layout = deepmerge.all([defLayout, props.layout]);
        const defConfig = {};
        const config = deepmerge.all([defConfig, props.config]);
        const defStyle = { width: '100%', height: '100%', margin: '0px' };
        const style = deepmerge.all([defStyle, props.style]);
        this.state = { data: compiledPlotData, layout: layout, config: config, style: style };
    }

    componentWillReceiveProps(nextProps) {
        this.propsToCompState(nextProps);
    }

    render() {
        return (
            <div>
                {/*<span>{JSON.stringify(this.state)}</span>*/}
                <Plot
                    style={this.state.style}
                    data={this.state.data}
                    layout={this.state.layout}
                    useResizeHandler={true}
                    onInitialized={(figure) => this.setState(figure)}
                    onUpdate={(figure) => this.setState(figure)}
                />
            </div>
        );
    }
}

export default ScatterPlot;