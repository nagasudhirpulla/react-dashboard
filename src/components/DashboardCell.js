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
import deepmerge from 'deepmerge';
import essentialProps from '../reducers/essentialProps';

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
            cellIndex: props.cellIndex,
            timerId: null
        };
        this.propsToCompState(props);
        //props.onCellCSVFetchClick(props.cellIndex, props.cellProps.plot_props.csv_address, props.cellProps.plot_props.csv_delimiter);
    }

    propsToCompState(props) {
        this.stopCellTimer = this.stopCellTimer.bind(this);
        this.reAssignCellTimer = this.reAssignCellTimer.bind(this);
        this.updatePlotData = this.updatePlotData.bind(this);
        this.deleteCellClick = this.deleteCellClick.bind(this);
        this.editCellClick = this.editCellClick.bind(this);
        
        // essential props
        props = deepmerge(essentialProps.dashbard_cell, props);
        //cell index
        this.state.cellIndex = props.cellIndex;
        //delete cell handler
        this.state.onDeleteCellClick = props.onDeleteCellClick;
        //edit cell handler
        this.state.onEditCellClick = props.onEditCellClick;

        this.state.updateDashboardCell = props.updateDashboardCell;

        // Plot information state
        this.state.cellProps = props.cellProps;
        // Plot container col string like col-sm-6
        this.state.containerColStr = props.cellProps.cell_geometry.cell_col_str;

        this.state.cellStyle = { 'minHeight': props.cellProps.cell_geometry.cell_min_height };

        // create the plot component
        const cellProps = this.state.cellProps;
        const csvArray = cellProps.plot_props.csvArray;
        if (cellProps.cell_type === 'csv_plot' || cellProps.cell_type === 'csv_h_plot') {
            //s bet the plot component xArrays and yArrays
            let xArrays = [], yArrays = [];
            if (cellProps.cell_type === 'csv_plot') {
                xArrays = extractCSVExprColumnsArr(csvArray, cellProps.plot_props.x_headings);
                yArrays = extractCSVExprColumnsArr(csvArray, cellProps.plot_props.y_headings);
            } else if (cellProps.cell_type === 'csv_h_plot') {
                xArrays = extractCSVHExprColumnsArr(csvArray, cellProps.plot_props.x_headings);
                yArrays = extractCSVHExprColumnsArr(csvArray, cellProps.plot_props.y_headings);
            }
            // update the plot component
            let cellComponent = <ScatterPlot
                {...cellProps.plot_props} xArrays={xArrays} yArrays={yArrays}
            />;
            this.state.cellComponent = cellComponent;
        }
        // todo if timer is enabled assign the timerId by setInterval
        this.reAssignCellTimer();
    }

    componentWillReceiveProps(nextProps) {
        this.propsToCompState(nextProps);
    }

    componentWillUnmount(){
        this.stopCellTimer();
    }

    stopCellTimer = () => {
        if (this.state.timerId != null) {
            // timer is running, hence stop it
            window.clearInterval(this.state.timerId);
        }
    }

    reAssignCellTimer = () => {
        // stop the timer first
        this.stopCellTimer();
        const auto_fetch = this.state.cellProps.auto_fetch;
        if (auto_fetch.enabled == true) {
            const timerInterval = auto_fetch.fetch_mins * 60000 + auto_fetch.fetch_secs * 1000;
            if (timerInterval > 0) {
                this.state.timerId = window.setInterval(this.updatePlotData, timerInterval);
            }
        }
    }

    updatePlotData = () => {
        // dispatch csv update action
        //console.log(`Timer call from cell ${this.state.cellIndex}`);
        this.state.updateDashboardCell(this.state.cellIndex, this.state.cellProps);        
    }

    deleteCellClick = () => {
        this.state.onDeleteCellClick(this.state.cellIndex);
    }

    editCellClick = () => {
        this.state.onEditCellClick(this.state.cellIndex);
    }

    render() {
        return (
            <div className={classNames(this.state.containerColStr, )} style={this.state.cellContainerStyle}>
                {/* <span>{JSON.stringify(dashboardCell)}</span> */}
                {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
                <div className={classNames('dashboard_cell', )} style={this.state.cellStyle}>
                    <div className={'dashboard_cell_bar'}>
                        <span>{this.state.cellProps.cell_name}</span>
                        <button onClick={this.editCellClick}>Edit Cell</button>
                        <button onClick={this.deleteCellClick}>Delete</button>
                    </div>
                    {/*JSON.stringify(this.state.cellProps.plot_props.csvArray)*/}
                    {this.state.cellComponent}
                </div>
            </div>
        );
    }
}

export default DashboardCell;