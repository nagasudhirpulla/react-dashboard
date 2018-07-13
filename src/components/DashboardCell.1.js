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

class DashboardCell1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellComponent: <div></div>,
            containerColStr: '',
            cellStyle: {},
            cellContainerStyle: {},
            dashboardCell: props.dashboardCell,
            csvArray: props.csvArray
        };
        this.state._ismounted = false;
        let containerColStr = props.dashboardCell.cell_geometry.cell_col_str;
        let cellStyle = { 'minHeight': props.dashboardCell.cell_geometry.cell_min_height };
        let cellContainerStyle = { 'padding': '0px' };
        this.state.containerColStr = containerColStr;
        this.state.cellStyle = cellStyle;
        this.state.cellContainerStyle = cellContainerStyle;
    }
    /*
        componentDidMount() {
            //this.setState({ _ismounted: true });
            
            const dashboardCell = this.state.dashboardCell;
            const csvArray = this.state.csvArray;
            if (csvArray === undefined || csvArray === null) {
    
            } else {
                if (dashboardCell.cell_type === 'csv_plot' || dashboardCell.cell_type === 'csv_h_plot') {
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
                    this.setState({ cellComponent: cellComponent });
                }
            }
            
        }
    */
    componentWillUnmount() {
        //this.setState({ _ismounted: false });
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
                    {/*insert a plot component here*/}
                    {this.state.cellComponent}
                </div>
            </div>
        );
    }
}

export default DashboardCell1;