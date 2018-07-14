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
        let cellContainerStyle = { 'padding': '0px' };
        this.state = {
            cellComponent: <div></div>,
            containerColStr: '',
            cellStyle: {},
            cellContainerStyle: cellContainerStyle,
            onCellCSVFetchClick: props.onCellCSVFetchClick,
            cellIndex: props.cellIndex
        };
        this.propsToCompState(props);
        //props.onCellCSVFetchClick(props.cellIndex, props.dashboardCell.plot_props.csv_address, props.dashboardCell.plot_props.csv_delimiter);
    }

    propsToCompState(props) {
        this.state.dashboardCell = props.dashboardCell;
        let containerColStr = props.dashboardCell.cell_geometry.cell_col_str;
        let cellStyle = { 'minHeight': props.dashboardCell.cell_geometry.cell_min_height };
        this.state.containerColStr = containerColStr;
        this.state.cellStyle = cellStyle;
        //this.setState({ _ismounted: true });
        const dashboardCell = this.state.dashboardCell;
        const csvArray = dashboardCell.plot_props.csvArray;
        if (dashboardCell.cell_type === 'csv_plot' || dashboardCell.cell_type === 'csv_h_plot') {
            // update the cell component
            let xArrays = [], yArrays = [];
            if (dashboardCell.cell_type === 'csv_plot') {
                xArrays = extractCSVExprColumnsArr(csvArray, dashboardCell.plot_props.x_headings);
                yArrays = extractCSVExprColumnsArr(csvArray, dashboardCell.plot_props.y_headings);
            } else if (dashboardCell.cell_type === 'csv_h_plot') {
                xArrays = extractCSVHExprColumnsArr(csvArray, dashboardCell.plot_props.x_headings);
                yArrays = extractCSVHExprColumnsArr(csvArray, dashboardCell.plot_props.y_headings);
            }

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