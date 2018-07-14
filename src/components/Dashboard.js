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
import classNames from 'classnames';
import { loadCellCSVArray } from '../actions/dashBoardActions'


const Dashboard = (props) => {
    return (
        <div className={classNames('container-fluid', { 'dashboard': true })}>
            {/* <span>{JSON.stringify(dashboard)}</span> */}
            {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
            <div className={classNames('row', )}>
                <div className={classNames('col-md-12', 'dashboard_bar')}>
                    <span>{props.dashboard.dashboard_name}</span></div>
            </div>
            <div className={classNames('row', )}>
                {
                    props.dashboard.dashboard_cells.map((cell, cellIndex) =>
                        <DashboardCell
                            key={cellIndex}
                            cellIndex={cellIndex}
                            dashboardCell={cell}
                            onCellCSVFetchClick={props.onCellCSVFetchClick}
                        />
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { dashboard: state.dashboard };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCellCSVFetchClick: (key, url, delimiter) => {
            loadCellCSVArray(dispatch, key, url, delimiter);
        }
    };
};

export default (
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
