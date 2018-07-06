/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/master/src/reducers/initialState.js
*/
export default {
    dashBoard: {
        dashboard_name: 'Dashboard Web App',
        dashboard_cells: [
            {
                cell_name: 'First Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_string: 'col-md-6'
                },
                plot_props: {
                    plot_type: 'scatter',
                    x_heading_str: 'x',
                    y_heading_str: 'y'
                }
            },
            {
                cell_name: 'Second Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_string: 'col-md-6'
                },
                plot_props: {
                    plot_type: 'scatter',
                    x_heading_str: 'x',
                    y_heading_str: 'y'
                }
            }
        ]
    },
    dashbard_cell: {
        cell_name: 'Dashboard Cell',
        cell_type: 'csv_plot',
        cell_geometry: {
            cell_col_string: 'col-md-6'
        },
        plot_props: {
            plot_type: 'scatter',
            x_heading_str: 'x',
            y_heading_str: 'y'
        }
    }
}