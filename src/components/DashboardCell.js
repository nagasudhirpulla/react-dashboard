/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using multiple class names in react
https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component/40824714
*/
import React from 'react';
import './DashboardCell.css';
import classNames from 'classnames';

const DashboardCell = ({ dashboardCell }) => {
    let cell_col_str = dashboardCell.cell_geometry.cell_col_str;
    let cellStyle = { 'minHeight': dashboardCell.cell_geometry.cell_min_height };
    let cellContainerStyle = { 'padding': '4px' };
    return (
        <div className={classNames(cell_col_str, )} style={cellContainerStyle}>
            {/* <span>{JSON.stringify(dashboardCell)}</span> */}
            {/* <span>{JSON.stringify(onDashBoardFetchClick())}</span> */}
            <div className={classNames('dashboard_cell', )} style={cellStyle}>
                <div className={'dashboard_cell_bar'}>
                    <span>{dashboardCell.cell_name}</span>
                </div>
                {/*insert a plot component here*/}
            </div>

        </div>
    );
};

export default DashboardCell;