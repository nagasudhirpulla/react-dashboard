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
            plot_props: {
                csvArray: [],
                x_headings: [],
                y_headings: [],
                csv_address: 'http://localhost:8807/sample_1.csv'
            }
        }
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