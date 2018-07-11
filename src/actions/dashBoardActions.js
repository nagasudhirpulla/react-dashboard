import * as types from './actionTypes';
import rp from 'request-promise';

export function loadDashboardFromAddress(filePath) {
	return function (dispatch) {
		rp(filePath)
			.then(function (dashboardStr) {
				try {
					let dashboardObj = JSON.parse(dashboardStr);
					dispatch(loadDashboard(dashboardObj));
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