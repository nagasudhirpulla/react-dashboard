import * as types from '../actions/actionTypes';
import initialState from './initialState';
import dashboardCellReducer from './dashboardCell'

export default function dashboardReducer(state = initialState.dashBoard, action) {
    switch (action.type) {
        case types.RESET_DASHBOARD:
            return initialState.dashBoard;
        case types.ADD_DASHBOARD_CELL:
            targetIndex = action.index;
            if (targetIndex == null || targetIndex > state.dashboard_cells.length || editingIndex < 0) {
                // add cell at the end if cannot find the adding index
                targetIndex = state.dashboard_cells.length - 1;
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
            if (targetIndex == null || targetIndex >= state.dashboard_cells.length || editingIndex < 0) {
                // do nothing if we cannot find the editing index
                return state;
            }
            return {
                ...state,
                dashboard_cells: [
                    ...state.dashboard_cells.slice(0, targetIndex),
                    dashboardCellReducer(state.dashboard_cells[targetIndex], action),
                    ...state.dashboard_cells.slice(targetIndex + 1)
                ]
            };
        case types.DELETE_DASHBOARD_CELL:
            targetIndex = action.index;
            if (targetIndex == null || targetIndex >= state.dashboard_cells.length || editingIndex < 0) {
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
        default:
            return state;
    }
}