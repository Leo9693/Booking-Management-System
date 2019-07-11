import React, { Component } from 'react';

export default class Layout extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div className="row no-gutters">
					<div className="col-2 bg-light" style={{Height: "150vh"}}>
						{this.props.sider}
					</div>
					<div className="col-10">
						<div style={{minHeight: "800px"}}>
							{this.props.content}
						</div>
						<div>
							{this.props.footer}
						</div>
					</div>
				</div>
			</div>
		)
	}
}