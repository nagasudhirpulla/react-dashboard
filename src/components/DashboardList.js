/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using multiple class names in react
https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component/40824714

Using JSON editor module for json editor UI
https://github.com/josdejong/jsoneditor/blob/master/examples/requirejs_demo/scripts/main.js
*/
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { loadDashboardFromAddress } from '../actions/dashBoardActions';
import { push } from 'connected-react-router';
import { Link } from "react-router-dom";

class DashboardList extends React.Component {
    constructor(props) {
        super(props);
        this.populateDashboardList = this.populateDashboardList.bind(this);
        this.dashListItemClick = this.dashListItemClick.bind(this);
        this.handleBaseAddrTxtChange = this.handleBaseAddrTxtChange.bind(this);
        // initialize screen state
        this.state = {
            props: props,
            dashList: [],
            baseAddr: 'http://localhost:8807'
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.setState({ props: nextProps });
    }

    componentDidMount = () => {
        //this.setUpEditorObject();
        this.populateDashboardList();
    }

    handleBaseAddrTxtChange = (event) => {
        this.setState({ baseAddr: event.target.value });
    }

    populateDashboardList = async () => {
        const resp = await fetch(this.state.baseAddr + '/api/dashboards');
        const dashboardListObj = await resp.json();
        //console.log(dashboardListObj.files);
        this.setState({ dashList: dashboardListObj.files });
    }

    dashListItemClick = (iter) => {
        let openDashboard = this.state.props.openDashboard;
        console.log(`Loading ${this.state.dashList[iter]}...`);
        openDashboard(`${this.state.baseAddr}/dashboards/${this.state.dashList[iter]}`);
    }

    render() {
        var dashNameRows = [];
        const funcFact = (itemIter) => {
            return ((e) => {
                e.preventDefault();
                this.dashListItemClick(itemIter);
            });
        };
        for (var i = 0; i < this.state.dashList.length; i++) {
            dashNameRows.push(<li><a href="#" onClick={funcFact(i).bind(this)}>{this.state.dashList[i]}</a></li>);
        }
        return (
            <div className={classNames('container-fluid', { 'dashboard': true })}>
                <div className={classNames('row')}>
                    <div className={classNames('col-md-12')}>
                        <h3>Dashboards list</h3>
                        <input type="text" value={this.state.baseAddr} onChange={this.handleBaseAddrTxtChange} />
                        <ul>{dashNameRows}</ul>
                        <button onClick={this.populateDashboardList}>Refresh list</button>
                        <br/>
                        <Link to="/">Go to Dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        openDashboard: (filePath) => {
            dispatch(push(`/`));
            dispatch(loadDashboardFromAddress(filePath));
        }
    };
};

export default (
    connect(mapStateToProps, mapDispatchToProps)(DashboardList)
);