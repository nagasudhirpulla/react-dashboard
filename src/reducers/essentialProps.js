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
                csv_address: 'http://localhost:8807/sample_1.csv'
            }*/
        }
    },
    csv_plot_props: {
        csvArray: [],
        x_headings: [],
        y_headings: [],
        csv_address: 'http://localhost:8807/sample_1.csv'
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