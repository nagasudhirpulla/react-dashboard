/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using flexbox for aligning items
https://www.youtube.com/watch?v=k32voqQhODc
https://codepen.io/anon/pen/VKxRoE?editors=1100
*/
import React from 'react';
import { connect } from 'react-redux';
import DashboardCell from './DashboardCell';
import './Dashboard.css';
import Modal from './Modal'
import classNames from 'classnames';
import { updateDashboardCell, loadDashboardFromAddress, addDashboardCell, addPSPPlotCell, deleteDashboardCell, editDashboardCell } from '../actions/dashBoardActions'
import deepmerge from 'deepmerge'
import essentialProps from '../reducers/essentialProps'
import qs from 'qs';
import * as cellTypes from '../actions/cellTypes';
import { checkNested } from '../utils/objectUtils';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleGoClick = this.handleGoClick.bind(this);
        this.handleSaveOverrideChkbxChange = this.handleSaveOverrideChkbxChange.bind(this);
        this.addPlotCellClick = this.addPlotCellClick.bind(this);
        this.addPSPPlotCellClick = this.addPSPPlotCellClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.saveDashBoard = this.saveDashBoard.bind(this);
        let filePath = qs.parse(props.location.search).filepath;
        if (filePath === undefined || filePath === null) {
            filePath = "";
        }
        // Don't call this.setState() here!
        this.state = { input: filePath, showModal: false, saveOverride: false };
        this.state.props = props;
        this.state.filePath = filePath;
        this.dashBoardNameInput = React.createRef();
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    saveDashBoard = async () => {
        //alert(`Saving Dashboard as ${this.dashBoardNameInput.current.value} with override ${this.state.saveOverride}...`);
        // derive the dashboard json,strip off csv arrays and then store it
        const props = deepmerge(essentialProps.dashboard, this.state.props);
        const dashboardExpObj = JSON.parse(JSON.stringify(props.dashboard));
        // make csvArray as undefined of all the dashboard cells
        for (let cellIndex = 0; cellIndex < dashboardExpObj.dashboard_cells.length; cellIndex++) {
            if (['csv_plot', 'csv_h_plot'].indexOf(dashboardExpObj.dashboard_cells[cellIndex].cell_type) > -1) {
                if (checkNested(dashboardExpObj.dashboard_cells[cellIndex], 'csv_plot_props', 'csvArray')) {
                    dashboardExpObj.dashboard_cells[cellIndex].csv_plot_props['csvArray'] = undefined;
                }
            } else if ([cellTypes.psp_api_plot].indexOf(dashboardExpObj.dashboard_cells[cellIndex].cell_type) > -1) {
                dashboardExpObj.dashboard_cells[cellIndex].data = undefined;
            }
        }
        let respObj;
        if (window.confirm("Are you sure to save the Dashbaord to the file server?")) {
            respObj = await this.saveDasboardAsync(this.dashBoardNameInput.current.value, this.state.saveOverride, dashboardExpObj);
        }

        if (respObj.success === true) {
            alert('Dashboard saved successfully in server!');
        } else {
            alert(`file was not saved due to ${respObj.message}`);
        }
        // todo change the dashboard url
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    addPlotCellClick = () => {
        this.state.props.onAddCellClick();
    }

    addPSPPlotCellClick = () => {
        this.state.props.addPSPPlotCellClick();
    }

    handleSaveOverrideChkbxChange = (event) => {
        this.setState({ saveOverride: event.target.checked });
    }

    async saveDasboardAsync(filename, rewrite, jsonObj) {
        try {
            const resp = await fetch('http://localhost:8807/api/dashboards/create', {
                method: 'post',
                headers: {
                    "accept": "application/json",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "en-US,en;q=0.8",
                    "content-type": "application/json",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) advanced-rest-client/12.1.3 Chrome/58.0.3029.110 Electron/1.7.12 Safari/537.36"
                },
                body: JSON.stringify({
                    "filename": filename,
                    "rewrite": rewrite,
                    "file_stuff": JSON.stringify(jsonObj)
                })
            });
            const respJSON = await resp.json();
            console.log(respJSON);
            return respJSON;
        } catch (e) {
            console.log(e);
            return { success: false, message: `Could not save due to error ${JSON.stringify(e)}` };
        }
    }

    handleGoClick = () => {
        //console.log(this.state.input);
        //todo change this
        let newFilePath = this.state.input
        this.state.props.history.push(`${this.state.props.match.path}?filepath=${newFilePath}`);
        //window.location.reload();
        this.state.props.onUrlFetchClick(newFilePath);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ props: nextProps });
    }

    render() {
        let props = deepmerge(essentialProps.dashboard, this.state.props);
        return (
            <div className={classNames('container-fluid', { 'dashboard': true })}>
                {/* <span>{JSON.stringify(dashboard)}</span> */}
                {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
                <div className={classNames('row')}>
                    <div className={classNames('col-md-12', 'dashboard_bar')}>
                        <span>{props.dashboard.dashboard_name}</span>
                        <input
                            type="text"
                            onChange={this.handleChange}
                            style={{ minWidth: '300px' }}
                            defaultValue={this.state.input}
                        />
                        <button onClick={this.handleGoClick}>Go!</button>
                        <button onClick={this.addPlotCellClick}>Add CSV Plot Cell</button>
                        <button onClick={this.addPSPPlotCellClick}>Add PSP Plot Cell</button>
                        <Modal show={this.state.showModal} handleClose={this.hideModal} >
                            <h2>Enter the Dashboard name</h2>
                            <br />
                            <div>
                                <input type='text' ref={this.dashBoardNameInput} />
                            </div>
                            <label><input type="checkbox" onChange={this.handleSaveOverrideChkbxChange} />Override</label>
                            <br />
                            <button className={classNames('btn', 'btn-primary')} onClick={this.saveDashBoard}>Save Dashboard</button>
                        </Modal>
                        <button onClick={this.showModal}>Save Dashboard</button>
                    </div>
                </div>
                <div className={classNames('row')}>
                    {
                        props.dashboard.dashboard_cells.map((cell, cellIndex) =>
                            <DashboardCell
                                key={cellIndex}
                                cellIndex={cellIndex}
                                cellProps={cell}
                                onCellCSVFetchClick={props.onCellCSVFetchClick}
                                onDeleteCellClick={props.onDeleteCellClick}
                                onEditCellClick={props.onEditCellClick}
                                updateDashboardCell={props.updateDashboardCell}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return { dashboard: state.dashboard };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUrlFetchClick: (filePath) => {
            dispatch(loadDashboardFromAddress(filePath));
        },
        onAddCellClick: () => {
            dispatch(addDashboardCell());
        },
        addPSPPlotCellClick: () => {
            dispatch(addPSPPlotCell());
        },
        onDeleteCellClick: (index) => {
            dispatch(deleteDashboardCell(index));
        },
        onEditCellClick: (index) => {
            dispatch(editDashboardCell(index));
        },
        updateDashboardCell: (index, dashboardCell) => {
            dispatch(updateDashboardCell(index, dashboardCell));
        }
    };
};

export default (
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
