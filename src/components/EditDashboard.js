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
        cellJSON.plot_props.csvArray = undefined;
        editor.set(cellJSON);
        this.setState({ editor: editor });
    }

    updateCellClick = () => {
        if (window.confirm("Are you sure to update the dashboard cell properties?")) {
            const newDashboardCellObj = this.state.editor.get();
            const cellIndex = this.getEditCellIndex()
            const cellJSON = { ...this.state.props.dashboard_cells[cellIndex] };
            newDashboardCellObj.plot_props.csvArray = cellJSON.plot_props.csvArray;
            //console.log(newDashboardCellObj);
            this.props.onUpdateCellClick(cellIndex, newDashboardCellObj);
        }
    }

    render() {
        return (
            <div className={classNames('container-fluid', { 'dashboard': true })}>
                <div className={classNames('row', )}>
                    <div className={classNames('col-md-12', )}>
                        <span>Welcome to edit screen of cell index {`${this.getEditCellIndex()}`}!</span>
                    </div>
                </div>

                <div className={classNames('row', )}>
                    <div className={classNames('col-md-6', )}>
                        {/*<p>{JSON.stringify(this.state.props.dashboard_cells[this.getEditCellIndex()])}</p>*/}
                        <div id="jsoneditor" className={classNames('jsoneditor_div')}></div>
                    </div>
                </div>

                <div className={classNames('row', )}>
                    <div className={classNames('col-md-6', )}>
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