/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using multiple class names in react
https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component/40824714
*/
import React from 'react';
import './DashboardCell.css';
import ScatterPlot from './ScatterPlot'
import classNames from 'classnames';
import { extractCSVExprColumnsArr, extractCSVHExprColumnsArr } from '../utils/csvUtils';

class DashboardCell extends React.Component {
    constructor(props) {
        super(props);
        // initialize cell state
        this.state = {
            cellComponent: <div></div>,
            containerColStr: '',
            cellStyle: {},
            cellContainerStyle: { 'padding': '0px' },
            onCellCSVFetchClick: props.onCellCSVFetchClick,
            cellIndex: props.cellIndex
        };
        this.propsToCompState(props);
        //props.onCellCSVFetchClick(props.cellIndex, props.dashboardCell.plot_props.csv_address, props.dashboardCell.plot_props.csv_delimiter);
    }

    propsToCompState(props) {
        // Plot information state
        this.state.dashboardCell = props.dashboardCell;
        // Plot container col string like col-sm-6
        this.state.containerColStr = props.dashboardCell.cell_geometry.cell_col_str;
        
        this.state.cellStyle = { 'minHeight': props.dashboardCell.cell_geometry.cell_min_height };
        
        // create the plot component
        const dashboardCell = this.state.dashboardCell;
        const csvArray = dashboardCell.plot_props.csvArray;
        if (dashboardCell.cell_type === 'csv_plot' || dashboardCell.cell_type === 'csv_h_plot') {
            //set the plot component xArrays and yArrays
            let xArrays = [], yArrays = [];
            if (dashboardCell.cell_type === 'csv_plot') {
                xArrays = extractCSVExprColumnsArr(csvArray, dashboardCell.plot_props.x_headings);
                yArrays = extractCSVExprColumnsArr(csvArray, dashboardCell.plot_props.y_headings);
            } else if (dashboardCell.cell_type === 'csv_h_plot') {
                xArrays = extractCSVHExprColumnsArr(csvArray, dashboardCell.plot_props.x_headings);
                yArrays = extractCSVHExprColumnsArr(csvArray, dashboardCell.plot_props.y_headings);
            }            
            // update the plot component
            let cellComponent = <ScatterPlot
                {...dashboardCell.plot_props} xArrays={xArrays} yArrays={yArrays}
            />;
            this.state.cellComponent = cellComponent;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.propsToCompState(nextProps);
    }

    render() {
        return (
            <div className={classNames(this.state.containerColStr, )} style={this.state.cellContainerStyle}>
                {/* <span>{JSON.stringify(dashboardCell)}</span> */}
                {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
                <div className={classNames('dashboard_cell', )} style={this.state.cellStyle}>
                    <div className={'dashboard_cell_bar'}>
                        <span>{this.state.dashboardCell.cell_name}</span>
                    </div>
                    {/*JSON.stringify(this.state.dashboardCell.plot_props.csvArray)*/}
                    {this.state.cellComponent}
                </div>
            </div>
        );
    }
}

export default DashboardCell;