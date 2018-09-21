import * as types from './actionTypes';
import * as cellTypes from './cellTypes';
import { fetchCSVArrayProm, fetchCSVArray, fetchPspLabelData, getPspRequesTimeStr, calculatePspRequesTime } from '../utils/csvUtils';
import { push } from 'connected-react-router'
import essentialProps from '../reducers/essentialProps';
import deepmerge from 'deepmerge';

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

export function addPSPPlotCell() {
	return { type: types.ADD_DASHBOARD_CELL_PSP, index: null, cellProps: {} };
}

export function deleteDashboardCell(index) {
	return { type: types.DELETE_DASHBOARD_CELL, index: index };
}

export function editDashboardPropsAction(editProps) {
	return { type: types.EDIT_DASHBOARD_PROPS, editProps: editProps };
}

export function editDashboardServerBaseAddr(addr) {
	return function (dispatch) {
		dispatch(editDashboardPropsAction({'dashboard_server_base_addr':addr}));
	};
}

export function editDashboardCell(index) {
	return function (dispatch) {
		//todo implement this
		dispatch(push(`/edit/${index}`));
	};
}

export function updateDashboardCell(cellIndex, dashboardCell) {
	return async function (dispatch) {
		if ([cellTypes.csv_h_plot, cellTypes.csv_plot].indexOf(dashboardCell.cell_type) > -1) {
			dashboardCell = await updateDashboardCellCSVArray(dashboardCell);
		} else if ([cellTypes.psp_api_plot].indexOf(dashboardCell.cell_type) > -1) {
			dashboardCell = await updateDashboardCellPspLabelData(dashboardCell);
		}
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
		else if (dashboardObj.dashboard_cells[i].cell_type === cellTypes.psp_api_plot) {
			dashboardObj.dashboard_cells[i] = await updateDashboardCellPspLabelData(dashboardObj.dashboard_cells[i]);
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
	const lineDelimiter = dashboardCellObj.csv_plot_props.line_delimiter;
	const csvArray = await fetchCSVArrayProm(csvUrl, delimiter, lineDelimiter);
	return csvArray;
}

export async function updateDashboardCellPspLabelData(dashboardCellObj) {
	// update the dashboardObj cells with the fetched csvArray
	//todo ensure essential fields
	if (dashboardCellObj.psp_api_plot_props === undefined) {
		return dashboardCellObj;
	}
	let measurements = dashboardCellObj.psp_api_plot_props.measurements;
	if (measurements === undefined) {
		return dashboardCellObj;
	}
	let xArrays = [];
	let yArrays = [];
	let xHeadings = [];
	let yHeadings = [];
	let xLabelArrays = [];
	for (let measIter = 0; measIter < measurements.length; measIter++) {
		//deepmerge with essential measurent
		const measurement = deepmerge(essentialProps.psp_api_measurement, measurements[measIter]);
		/*
		http://localhost:61238/api/psp?label=gujarat_thermal_mu&from_time=20180810&to_time=20180818
		{
                base_url: 'http://localhost:61238',
                label: 'gujarat_thermal_mu',
                start_time_mode: 'variable',
                start_day: -10,
                start_month: 0,
                start_year: 0,
                end_time_mode: 'variable',
                end_day: -1,
                end_month: 0,
                end_year: 0
            }
		 */
		const startTimeMode = measurement.start_time_mode;
		const endTimeMode = measurement.end_time_mode;
		const startTimeStr = getPspRequesTimeStr(calculatePspRequesTime(startTimeMode, measurement.start_day, measurement.start_month, measurement.start_year));
		const endTimeStr = getPspRequesTimeStr(calculatePspRequesTime(endTimeMode, measurement.end_day, measurement.end_month, measurement.end_year));
		const dataUrl = `${measurement.base_url}/api/psp?label=${measurement.label}&from_time=${startTimeStr}&to_time=${endTimeStr}`;
		const res = await fetchPspLabelData(dataUrl);
		xArrays.push(res.xVals);
		yArrays.push(res.yVals);
		xHeadings.push('time');
		yHeadings.push(measurement.label);
		xLabelArrays.push(res.xLabels);
	}
	dashboardCellObj.data = { xArrays: xArrays, yArrays: yArrays, xLabelArrays: xLabelArrays, xHeadings: xHeadings, yHeadings: yHeadings, };
	return dashboardCellObj;
}