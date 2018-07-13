/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/master/src/reducers/initialState.js
*/
export default {
    dashboard: {
        dashboard_name: 'Dashboard Web App',
        dashboard_cells: [
            {
                cell_name: 'First Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-6',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_modes: ['lines', 'lines'],
                    x_headings: ['x', 'x'],
                    y_headings: ['y', 'z'],
                    colors: ['red', 'yellow'],
                    csv_address: 'http://localhost:8807/sample_1.csv'
                }
            }
        ]
    },
    dashbard_cell: {
        cell_name: 'Dashboard Cell',
        cell_type: 'csv_plot',
        cell_geometry: {
            cell_col_str: 'col-sm-6',
            cell_min_width: '0px',
            cell_min_height: '100px'
        },
        plot_props: {
            plot_modes: ['lines'],
            x_headings: ['x'],
            y_headings: ['y'],
            colors: ['red'],
            csv_address: 'http://localhost:8807/sample_1.csv'
        }
    }
}