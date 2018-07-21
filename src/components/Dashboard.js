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
import deepmerge from 'deepmerge'
import essentialProps from '../reducers/essentialProps'
import qs from 'query-string';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        let filePath = qs.parse(props.location.search).filepath;
        if (filePath === undefined || filePath === null) {
            filePath = "";
        }
        // Don't call this.setState() here!
        this.state = { input: filePath };
        this.state.props = props;
        this.state.filePath = filePath;
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleClick = () => {
        //console.log(this.state.input);
        this.state.props.history.push(`${this.state.props.match.path}?filepath=${this.state.input}`);
        window.location.reload();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ props: nextProps });
    }

    render() {
        let props = deepmerge(essentialProps, this.state.props);
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
                        <button onClick={this.handleClick}>Go!</button>
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
        onCellCSVFetchClick: (key, url, delimiter) => {
            loadCellCSVArray(dispatch, key, url, delimiter);
        }
    };
};

export default (
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
