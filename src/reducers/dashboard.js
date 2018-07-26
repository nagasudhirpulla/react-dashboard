import * as types from '../actions/actionTypes';
import initialState from './initialState';
import dashboardCellReducer from './dashboardCell';

export default function dashboardReducer(state = initialState.dashboard, action) {
    switch (action.type) {
        case types.SET_DASHBOARD:
            return {
                ...action.dashboard
            };
        case types.RESET_DASHBOARD:
            return initialState.dashboard;
        case types.FETCH_DASHBOARD_CSVS:
            //stub    
            return state;
        case types.ADD_DASHBOARD_CELL:
            let targetIndex = action.index;
            if (targetIndex == null || targetIndex > state.dashboard_cells.length || targetIndex < 0) {
                // add cell at the end if cannot find the adding index
                targetIndex = state.dashboard_cells.length;
            }
            return {
                ...state,
                dashboard_cells: [
                    ...state.dashboard_cells.slice(0, targetIndex),
                    dashboardCellReducer(undefined, action),
                    ...state.dashboard_cells.slice(targetIndex)
                ]
            };
        case types.EDIT_DASHBOARD_CELL_PROPS:
            targetIndex = action.index;
            if (targetIndex == null || targetIndex >= state.dashboard_cells.length || targetIndex < 0) {
                // do nothing if we cannot find the editing index
                return state;
            }
            const newCell = dashboardCellReducer(state.dashboard_cells[targetIndex], action);
            return {
                ...state,
                dashboard_cells: [
                    ...state.dashboard_cells.slice(0, targetIndex),
                    newCell,
                    ...state.dashboard_cells.slice(targetIndex + 1)
                ]
            };
        case types.DELETE_DASHBOARD_CELL:
            targetIndex = action.index;
            if (targetIndex == null || targetIndex >= state.dashboard_cells.length || targetIndex < 0) {
                // do nothing if we cannot find the deleting index
                return state;
            }
            return {
                ...state,
                dashboard_cells: [
                    ...state.dashboard_cells.slice(0, targetIndex),
                    ...state.dashboard_cells.slice(targetIndex + 1)
                ]
            };
        case types.EDIT_DASHBOARD_PROPS:
            //edit dashboard object with the action props
            return {
                ...state,
                ...action.editProps
            };
        default:
            return state;
    }
}