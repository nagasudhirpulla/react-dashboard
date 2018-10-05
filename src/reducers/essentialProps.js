/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/master/src/reducers/initialState.js
*/
export default {
    dashboard: {
        dashboard: {
            dashboard_name: 'Dashboard Web App',
            dashboard_cells: []
        },
        onCellCSVFetchClick: (dispatch, key, url, delimiter) => { }
    },
    dashbard_cell: {
        cellProps: {
            cell_name: 'Dashboard Cell',
            cell_type: 'csv_plot',
            auto_fetch: {
                enabled: false,
                fetch_mins: 0,
                fetch_secs: 0
            },
            cell_geometry: {
                cell_col_str: 'col-sm-12',
                cell_min_width: '0px',
                cell_min_height: '100px'
            },
            data: {}
            /*,
            csv_plot_props: {
                csvArray: [],
                x_headings: [],
                y_headings: [],
                csv_address: 'http://10.2.100.56:8807/sample_1.csv'
            }*/
        }
    },
    csv_plot_props: {
        csvArray: [],
        x_headings: [],
        y_headings: [],
        csv_address: 'http://10.2.100.56:8807/sample_1.csv'
    },
    psp_api_plot_props: {
        measurements: []
    },
    psp_api_measurement:
    {
        //http://localhost:61238/api/psp?label=gujarat_thermal_mu&from_time=20180810&to_time=20180818
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
    },
    scada_api_plot_props: {
        measurements: []
    },
    scada_api_measurement:
    {
        //http://localhost:61238/api/values/history?type=snap&pnt=something&strtime=30/11/2016/00:00:00&endtime=30/11/2016/23:59:00&secs=60
        base_url: 'http://wmrm0mc1:62448',
        name: 'WR Demand',
        pnt_id: 'WRLDCMP.SCADA1.A0047000',
        start_time_mode: 'variable',
        start_date_mode: 'variable',
        start_day: -10,
        start_month: 0,
        start_year: 0,
        start_hours: 0,
        start_mins: 0,
        start_secs: 0,
        end_time_mode: 'variable',
        end_date_mode: 'variable',
        end_day: -1,
        end_month: 0,
        end_year: 0,
        end_hours: 0,
        end_mins: 0,
		end_secs: 0,
		period_secs: 60,
		fetch_strategy: 'average'
    },
    scatter_plot: {
        xArrays: [],
        yArrays: [],
        colors: [],
        plot_modes: [],
        names: [],
        layout: {},
        config: {},
        style: {}
    }
}