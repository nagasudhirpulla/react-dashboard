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
import { updateDashboardCell, loadDashboardFromAddress, addDashboardCell, deleteDashboardCell, editDashboardCell } from '../actions/dashBoardActions'
import deepmerge from 'deepmerge'
import essentialProps from '../reducers/essentialProps'
import qs from 'query-string';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleGoClick = this.handleGoClick.bind(this);
        this.addPlotCellClick = this.addPlotCellClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.saveDashBoard = this.saveDashBoard.bind(this);
        let filePath = qs.parse(props.location.search).filepath;
        if (filePath === undefined || filePath === null) {
            filePath = "";
        }
        // Don't call this.setState() here!
        this.state = { input: filePath, showModal: false };
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

    saveDashBoard = () => {
        alert(`Saving Dashboard as ${this.dashBoardNameInput.current.value}...`);
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    addPlotCellClick = () => {
        this.state.props.onAddCellClick();
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
                <div className={classNames('row', )}>
                    <div className={classNames('col-md-12', 'dashboard_bar')}>
                        <span>{props.dashboard.dashboard_name}</span>
                        <input
                            type="text"
                            onChange={this.handleChange}
                            style={{ minWidth: '300px' }}
                            defaultValue={this.state.input}
                        />
                        <button onClick={this.handleGoClick}>Go!</button>
                        <button onClick={this.addPlotCellClick}>Add Plot Cell</button>
                        <Modal show={this.state.showModal} handleClose={this.hideModal} >
                            <h2>Enter the Dashboard name</h2>
                            <br />
                            <div>
                                <input type='text' ref={this.dashBoardNameInput} />
                            </div>
                            <label><input type="checkbox" checked />Override</label>
                            <br />
                            <button onClick={this.saveDashBoard}>Save Dashboard</button>
                        </Modal>
                        <button onClick={this.showModal}>Save Dashboard</button>
                    </div>
                </div>
                <div className={classNames('row', )}>
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
