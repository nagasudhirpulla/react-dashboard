import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {equipDefaultProp, keepSpecifiedPropsOnly} from '../utils/objectUtils';

export default function dashboardCellReducer(state = initialState.dashbard_cell, action) {
    switch (action.type) {
        case types.RESET_DASHBOARD_CELL:
            return initialState.dashbard_cell;
        case types.ADD_DASHBOARD_CELL:
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
    let initialCell = initialState.dashbard_cell;
    
    let cellPropKeys = Object.keys(initialCell);
    let dashbardCell = keepSpecifiedPropsOnly(action, cellPropKeys);

    for (let i = 0; i < cellPropKeys.length; i++) {
        dashbardCell = equipDefaultProp(dashbardCell, cellPropKeys[i], initialCell[cellPropKeys[i]]);
    }

    return dashbardCell;
}