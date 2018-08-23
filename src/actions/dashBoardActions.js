import * as types from './actionTypes';
import { fetchCSVArrayProm, fetchCSVArray } from '../utils/csvUtils';
import { push } from 'connected-react-router'

export function loadDashboardFromAddress(filePath) {
	return async function (dispatch) {
		try {
			const resp = await fetch(filePath);
			const dashboardObj = await resp.json();
			await updateAllDashboardCells(dashboardObj, dispatch);
		} catch (e) {
			console.log(e);
		}
	};
}

export function updateStoreDashboards(dashboardObj) {
	return async function (dispatch) {
		try {
			await updateAllDashboardCells(dashboardObj, dispatch);
		} catch (e) {
			console.log(e);
		}
	};
}

export function loadDashboard(dashboardObj) {
	//console.log(dashboardObj);
	return { type: types.SET_DASHBOARD, dashboard: dashboardObj };
}

export function loadCellCSVArray(cellIndex, dashboardCell) {
	return async function (dispatch) {
		const csvArray = await getDashboardCellCSVArray(dashboardCell);
		dispatch(setCellCSVArray(cellIndex, csvArray));
	};
}

export function setCellCSVArray(cellIndex, csvArray) {
	//console.log(csvArray);
	return { type: types.EDIT_DASHBOARD_CELL_PROPS, index: cellIndex, editProps: { csvArray: csvArray } };
}

export function addDashboardCell() {
	return { type: types.ADD_DASHBOARD_CELL, index: null, cellProps: {} };
}

export function deleteDashboardCell(index) {
	return { type: types.DELETE_DASHBOARD_CELL, index: index };
}

export function editDashboardCell(index) {
	return function (dispatch) {
		//todo implement this
		dispatch(push(`/edit/${index}`));
	};
}

export function updateDashboardCell(cellIndex, dashboardCell) {
	return async function (dispatch) {
		dashboardCell = await updateDashboardCellCSVArray(dashboardCell);
		dispatch(updateCellAction(cellIndex, dashboardCell));
	};
}

export function updateCellAction(cellIndex, dashboardCell) {
	//console.log(dashboardCell);
	return { type: types.EDIT_DASHBOARD_CELL_PROPS, index: cellIndex, editProps: dashboardCell };
}


export async function updateAllDashboardCells(dashboardObj, dispatch) {
	// update the dashboardObj cells with the fetched csvArray
	for (let i = 0; i < dashboardObj.dashboard_cells.length; i++) {
		if (['csv_plot', 'csv_h_plot'].indexOf(dashboardObj.dashboard_cells[i].cell_type) > -1) {
			dashboardObj.dashboard_cells[i] = await updateDashboardCellCSVArray(dashboardObj.dashboard_cells[i]);
		}
		// handle other cell types like api cell fetching here
	}
	dispatch(loadDashboard(dashboardObj));
}

export async function updateDashboardCellCSVArray(dashboardCellObj) {
	// update the dashboardObj cells with the fetched csvArray
	const csvArray = await getDashboardCellCSVArray(dashboardCellObj)
	dashboardCellObj.csv_plot_props.csvArray = csvArray;
	return dashboardCellObj;
}

export async function getDashboardCellCSVArray(dashboardCellObj) {
	// update the dashboardObj cells with the fetched csvArray
	const csvUrl = dashboardCellObj.csv_plot_props.csv_address;
	const delimiter = dashboardCellObj.csv_plot_props.csv_delimiter;
	const csvArray = await fetchCSVArrayProm(csvUrl, delimiter);
	return csvArray;
}