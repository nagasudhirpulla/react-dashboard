import * as types from '../actions/actionTypes';
import initialState from './initialState';
import essentialProps from './essentialProps'
import deepmerge from 'deepmerge'
import * as cellTypes from '../actions/cellTypes';

export default function dashboardCellReducer(state = initialState.dashbard_cell, action) {
    switch (action.type) {
        case types.RESET_DASHBOARD_CELL:
            return initialState.dashbard_cell;
        case (types.ADD_DASHBOARD_CELL && types.ADD_DASHBOARD_CELL_PSP):
            //return a new cell object with the action props
            return createDashboardCell(action);
        case types.EDIT_DASHBOARD_CELL_PROPS:
            //edit cell object with the action props
            return {
                ...state,
                ...action.editProps
            };            
        default:
            return state;
    }
}

function createDashboardCell(action) {
    let essentialState = essentialProps.dashbard_cell.cellProps;
    let dashbardCell = deepmerge(essentialState, action.cellProps);
    if (action.type == types.ADD_DASHBOARD_CELL_PSP) {
        dashbardCell.cell_type = cellTypes.psp_api_plot;
    }
    return dashbardCell;
}