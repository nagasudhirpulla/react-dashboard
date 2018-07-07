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

const Dashboard = ({ dashboard, onDashBoardFetchClick }) => {
    let cellClasses = classNames('container-fluid',
        { 'dashboard': true }
    );
    return (
        <div className={cellClasses}>
            <div className={classNames('row', )}>
                <div className={classNames('col-md-12', 'dashboard_bar')}>
                    <span>{dashboard.dashboard_name}</span></div>
            </div>
            {/* <span>{JSON.stringify(dashboard)}</span> */}
            {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
            <div className={classNames('row', )}>
                {
                    dashboard.dashboard_cells.map((cell, cellIndex) =>
                        <DashboardCell
                            key={cellIndex}
                            dashboardCell={cell}
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
        onDashBoardFetchClick: () => {
            return 'sudhir';
        }
    };
};

export default (
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
