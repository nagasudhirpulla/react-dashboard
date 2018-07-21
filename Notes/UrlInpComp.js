import React from 'react';
class UrlInpComp extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = this.getInitialState();
        this.state.filePath = props.filePath;
    }

    getInitialState() {
        return { input: '' };
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
    }

    handleClick() {
        console.log(this.state.input);
    }

    getVal() {
        return this.state.input
    }

    render() {
        return (
            <input type="text" onChange={this.handleChange} style={{ minWidth: '300px' }} defaultValue={this.state.filePath} />
        );
    }
}

export default UrlInpComp