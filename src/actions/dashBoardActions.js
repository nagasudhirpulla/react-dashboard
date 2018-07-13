import * as types from './actionTypes';
import rp from 'request-promise';
import { fetchCSVArray } from '../utils/csvUtils';

export function loadDashboardFromAddress(filePath) {
	return function (dispatch) {
		rp(filePath)
			.then(function (dashboardStr) {
				try {
					let dashboardObj = JSON.parse(dashboardStr);
					dispatch(loadDashboard(dashboardObj));
					// trigger csv fetching of each dashboardcell
					updateAllDashboards(dispatch);
				} catch (e) {
					// do nothing
					
				}
			})
			.catch(function (err) {
				
			});
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

export function updateAllDashboards(dispatch) {
	// todo complete
}