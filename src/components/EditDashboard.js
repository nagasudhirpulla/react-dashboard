/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using multiple class names in react
https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component/40824714

Using JSON editor module for json editor UI
https://github.com/josdejong/jsoneditor/blob/master/examples/requirejs_demo/scripts/main.js
*/
import React from 'react';
import { connect } from 'react-redux';
import { updateDashboardCell } from '../actions/dashBoardActions';
import jsoneditor from 'jsoneditor';
import './jsoneditor/jsoneditor.min.css';
import classNames from 'classnames';
import './EditDashboard.css';
import essentialProps from '../reducers/essentialProps';
import * as cellTypes from '../actions/cellTypes';
import { checkNested } from '../utils/objectUtils';
import { Link } from "react-router-dom";

class EditDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getEditCellIndex = this.getEditCellIndex.bind(this);
        this.setUpEditorObject = this.setUpEditorObject.bind(this);
        // initialize cell state
        this.state = {
            props: props,
            editor: null
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.setState({ props: nextProps });
    }

    getEditCellIndex = () => {
        return this.state.props.match.params.id;
    }

    componentDidMount = () => {
        this.setUpEditorObject();
    }

    setUpEditorObject = () => {
        // create the editor
        const container = document.getElementById('jsoneditor');
        var options = {
            mode: 'tree',
            modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            onError: function (err) {
                alert(err.toString());
            },
            onModeChange: function (newMode, oldMode) {
                //console.log('Mode switched from', oldMode, 'to', newMode);
            }
        };
        const editor = new jsoneditor(container, options);
        //set editor json
        //try to implement cloning using deepmerge or object spread operator
        const cellJSON = JSON.parse(JSON.stringify(this.state.props.dashboard_cells[this.getEditCellIndex()]));
        cellJSON.data = undefined;
        // remove csvArray for editing
        if (['csv_plot', 'csv_h_plot'].indexOf(cellJSON.cell_type) > -1) {
            if (cellJSON.csv_plot_props === undefined) {
                cellJSON.csv_plot_props = essentialProps.csv_plot_props;
            }
            cellJSON.csv_plot_props.csvArray = undefined;
        } else if ([cellTypes.psp_api_plot].indexOf(cellJSON.cell_type) > -1) {
            if (cellJSON.psp_api_plot_props === undefined) {
                cellJSON.psp_api_plot_props = essentialProps.psp_api_plot_props;
            }
        } else if ([cellTypes.scada_api_plot].indexOf(cellJSON.cell_type) > -1) {
            if (cellJSON.scada_api_plot_props === undefined) {
                cellJSON.scada_api_plot_props = essentialProps.scada_api_plot_props;
            }
        }
        editor.set(cellJSON);
        this.setState({ editor: editor });
    }

    updateCellClick = () => {
        if (window.confirm("Are you sure to update the dashboard cell properties?")) {
            const newDashboardCellObj = this.state.editor.get();
            const cellIndex = this.getEditCellIndex()
            const cellJSON = { ...this.state.props.dashboard_cells[cellIndex] };
            //restore csvArray of the cell
            if (['csv_plot', 'csv_h_plot'].indexOf(cellJSON.cell_type) > -1) {
                if (checkNested(newDashboardCellObj, 'csv_plot_props', 'csvArray')) {
                    newDashboardCellObj.csv_plot_props.csvArray = cellJSON.csv_plot_props.csvArray;
                }
            }
            else if ([cellTypes.psp_api_plot, cellTypes.scada_api_plot].indexOf(cellJSON.cell_type) > -1) {
                //restore cell data
                newDashboardCellObj.data = cellJSON.data;
            }
            //console.log(newDashboardCellObj);
            this.props.onUpdateCellClick(cellIndex, newDashboardCellObj);
        }
    }

    addPSPMeasClick = () => {
        const newDashboardCellObj = this.state.editor.get();
        // check if dashboardcell is psp api cell
        if (newDashboardCellObj.cell_type == cellTypes.psp_api_plot) {
            //check if cell has the psp_api_plot_props.measurements prop
            if (checkNested(newDashboardCellObj, 'psp_api_plot_props', 'measurements')) {
                newDashboardCellObj.psp_api_plot_props.measurements.push(essentialProps.psp_api_measurement);
                this.state.editor.set(newDashboardCellObj);
            }
            else {
                alert('looks like there is some problem in cell configuration object');
            }
        } else {
            alert('Current cell is not a psp api cell');
        }
    }

    render() {
        return (
            <div className={classNames('container-fluid', { 'dashboard': true })}>
                <div className={classNames('row')}>
                    <div className={classNames('col-md-12')}>
                        <h5>Welcome to edit screen of cell index {`${this.getEditCellIndex()}`}!</h5>
                        <button onClick={this.addPSPMeasClick}>Add PSP measurement</button>
                        <br />
                        <Link to="/">Go to Dashboard</Link>
                    </div>
                </div>

                <div className={classNames('row')}>
                    <div className={classNames('col-md-6')}>
                        {/*<p>{JSON.stringify(this.state.props.dashboard_cells[this.getEditCellIndex()])}</p>*/}
                        <div id="jsoneditor" className={classNames('jsoneditor_div')}></div>
                    </div>
                </div>

                <div className={classNames('row')}>
                    <div className={classNames('col-md-6')}>
                        <button onClick={this.updateCellClick}>Update the Cell</button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { dashboard_cells: state.dashboard.dashboard_cells };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCellClick: (index, dashboardCell) => {
            dispatch(updateDashboardCell(index, dashboardCell));
        }
    };
};

export default (
    connect(mapStateToProps, mapDispatchToProps)(EditDashboard)
);