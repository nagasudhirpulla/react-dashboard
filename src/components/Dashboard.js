/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js
*/
import React from 'react';
import { connect } from 'react-redux';
import DashboardCell from './DashboardCell';
import './Dashboard.css'

const Dashboard = ({ dashboard, onDashBoardFetchClick }) => (
    <div class='dashboard'>
        <span>Name: {dashboard.dashboard_name}</span>
        {/* <span>{JSON.stringify(dashboard)}</span> */}
        {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
        <div>
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
