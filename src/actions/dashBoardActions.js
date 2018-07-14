import * as types from './actionTypes';
import rp from 'request-promise';
import { fetchCSVArrayProm, fetchCSVArray } from '../utils/csvUtils';

export function loadDashboardFromAddress(filePath) {
	return async function (dispatch) {
		try {
			const resp = await fetch(filePath);
			const dashboardObj = await resp.json();
			await updateAllDashboards(dashboardObj, dispatch);
		} catch (e) {
			console.log(e);
		}
	};
}

export function updateStoreDashboards(dashboardObj) {
	return async function (dispatch) {
		try {
			await updateAllDashboards(dashboardObj, dispatch);
		} catch (e) {
			console.log(e);
		}
	};
}

export function loadDashboard(dashboardObj) {
	console.log(dashboardObj);
	return { type: types.SET_DASHBOARD, dashboard: dashboardObj };
}

export function loadCellCSVArray(dispatch, cellIndex, url, delimiter) {
	// fetch csv from the url
	fetchCSVArray(url, delimiter, function (err, csvArray) {
		dispatch(setCellCSVArray(cellIndex, csvArray));
	});
}

export function setCellCSVArray(cellIndex, csvArray) {
	console.log(csvArray);
	return { type: types.EDIT_DASHBOARD_CELL_PROPS, index: cellIndex, editProps: { csvArray: csvArray } };
}

export async function updateAllDashboards(dashboardObj, dispatch) {
	// update the dashboardObj cells with the fetched csvArray
	for (let i = 0; i < dashboardObj.dashboard_cells.length; i++) {
		let csvUrl = dashboardObj.dashboard_cells[i].plot_props.csv_address;
		let delimiter = dashboardObj.dashboard_cells[i].plot_props.csv_delimiter;
		let csvArray = await fetchCSVArrayProm(csvUrl, delimiter);
		dashboardObj.dashboard_cells[i].plot_props.csvArray = csvArray;
	}
	dispatch(loadDashboard(dashboardObj));
}