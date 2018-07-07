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
                    cell_col_str: 'col-sm-9',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_type: 'scatter',
                    x_heading_str: 'x',
                    y_heading_str: 'y',
                    csv_address: 'http://localhost:8807/sample_1.csv'
                }
            },
            {
                cell_name: 'Second Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-3',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_type: 'scatter',
                    x_heading_str: 'a',
                    y_heading_str: 'b',
                    csv_address: 'http://localhost:8807/sample_2.csv'
                }
            },
            {
                cell_name: 'Third Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-6',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_type: 'scatter',
                    x_heading_str: 'x',
                    y_heading_str: 'y',
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
            plot_type: 'scatter',
            x_heading_str: 'x',
            y_heading_str: 'y',
            csv_address: 'http://localhost:8807/sample_1.csv'
        }
    }
}