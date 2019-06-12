import React from 'react';

export default (props) => (
    <h2>{props.match.path}</h2>
)

// class adminView extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <h2>{this.props.match.path}</h2>
//         )
//     }
// }