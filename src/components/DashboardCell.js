/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js
*/
import React from 'react';
import './DashboardCell.css'

const DashboardCell = ({dashboardCell}) => (
    <div class='dashboard_cell'>
        <span>Name: {dashboardCell.cell_name}</span>

        {/* <span>{JSON.stringify(dashboard)}</span> */}
        {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
    </div>
);

export default DashboardCell;