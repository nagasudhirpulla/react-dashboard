/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using multiple class names in react
https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component/40824714
*/
import React from 'react';
import './DashboardCell.css';
import ScatterPlot from './ScatterPlot'
import classNames from 'classnames';
import { fetchCSVArray, extractCSVExprColumnsArr, extractCSVHExprColumnsArr } from '../utils/csvUtils';
import { waterfall } from 'async';

class DashboardCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellComponent: <div></div>,
            containerColStr: '',
            cellStyle: {},
            cellContainerStyle: {},
            cell_name: 'Cell name'
        };
        let dashboardCell = props.dashboardCell;
        let containerColStr = dashboardCell.cell_geometry.cell_col_str;
        let cellStyle = { 'minHeight': dashboardCell.cell_geometry.cell_min_height };
        let cellContainerStyle = { 'padding': '0px' };
        this.state.containerColStr = containerColStr;
        this.state.cellStyle = cellStyle;
        this.state.cellContainerStyle = cellContainerStyle;
        this.state.cell_name = dashboardCell.cell_name;
        let cellComponent;
        if (dashboardCell.cell_type === 'csv_plot' || dashboardCell.cell_type === 'csv_h_plot') {
            // create a Scatter Plot component
            waterfall([
                function (callback) {
                    // get the csv Array
                    fetchCSVArray(dashboardCell.plot_props.csv_address, dashboardCell.plot_props.csv_delimiter, (err, res) => {
                        callback(err, res);
                    });
                }
            ], function (err, csvArray) {
                let xArrays = [], yArrays = [];
                if (dashboardCell.cell_type === 'csv_plot') {
                    xArrays = extractCSVExprColumnsArr(csvArray, dashboardCell.plot_props.x_headings);
                    yArrays = extractCSVExprColumnsArr(csvArray, dashboardCell.plot_props.y_headings);
                } else if (dashboardCell.cell_type === 'csv_h_plot') {
                    xArrays = extractCSVHExprColumnsArr(csvArray, dashboardCell.plot_props.x_headings);
                    yArrays = extractCSVHExprColumnsArr(csvArray, dashboardCell.plot_props.y_headings);
                }
                cellComponent = <ScatterPlot
                    {...dashboardCell.plot_props} xArrays={xArrays} yArrays={yArrays}
                />;
                this.state.cellComponent = cellComponent;
                this.forceUpdate();
            }.bind(this));
        }
    }

    render() {
        return (
            <div className={classNames(this.state.containerColStr, )} style={this.state.cellContainerStyle}>
                {/* <span>{JSON.stringify(dashboardCell)}</span> */}
                {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
                <div className={classNames('dashboard_cell', )} style={this.state.cellStyle}>
                    <div className={'dashboard_cell_bar'}>
                        <span>{this.state.cell_name}</span>
                    </div>
                    {/*insert a plot component here*/}
                    {this.state.cellComponent}
                </div>
            </div>
        );
    }
}

export default DashboardCell;