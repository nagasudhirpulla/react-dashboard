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
            },
            {
                cell_name: 'Second Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-6',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_modes: ['lines'],
                    x_headings: ['a'],
                    y_headings: ['b'],
                    colors: ['blue'],
                    csv_address: 'http://localhost:8807/sample_2.csv'
                }
            },
            {
                cell_name: 'Third Cell',
                cell_type: 'csv_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-12',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_modes: ['lines'],
                    x_headings: ['x'],
                    y_headings: ['y'],
                    colors: ['green'],
                    csv_address: 'http://localhost:8807/sample_1.csv'
                }
            },
            {
                cell_name: 'Fourth Cell',
                cell_type: 'csv_h_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-12',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_modes: ['lines'],
                    x_headings: ['TIMEBLOCK', 'TIMEBLOCK', 'TIMEBLOCK'],
                    y_headings: ['WR-NR_TTC', 'WR-NR_ATC', 'NR_TOTAL'],
                    colors: ['green', 'yellow', 'red'],
                    csv_address: 'http://localhost:8807/scada.txt',
                    csv_delimiter: '   '
                }
            },
            {
                cell_name: 'Fifth Cell',
                cell_type: 'csv_h_plot',
                cell_geometry: {
                    cell_col_str: 'col-sm-12',
                    cell_min_width: '0px',
                    cell_min_height: '100px'
                },
                plot_props: {
                    plot_modes: ['lines'],
                    x_headings: ['x'],
                    y_headings: ['y'],
                    colors: ['green'],
                    csv_address: 'http://localhost:8807/sample_3.csv'
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