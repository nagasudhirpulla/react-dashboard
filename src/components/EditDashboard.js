/*
https://github.com/SophieDeBenedetto/catbook-redux/blob/blog-post/src/index.js

Using multiple class names in react
https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component/40824714
*/
import React from 'react';

class EditDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getEditCellIndex = this.getEditCellIndex.bind(this);
        // initialize cell state
        this.state = {
            props: props
        };
    }

    getEditCellIndex = () => {
        return this.state.props.match.params.id;
    }

    render() {
        return (
            <div>
                <h1>Welcome to edit screen of cell {`${this.getEditCellIndex()}`}!</h1>
            </div>
        );
    }
}

export default EditDashboard;