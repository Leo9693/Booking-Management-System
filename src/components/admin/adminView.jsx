import React from 'react';

// export default (props) => (
//     <h2>{props.match.path}</h2>
// )

class AdminView extends React.Component {


    render() {

        return (
            <h2>this.props.match.path: {this.props.match.path}</h2>
        )
    }
}

export default AdminView