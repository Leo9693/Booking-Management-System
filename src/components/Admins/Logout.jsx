import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Avatar, message } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { logout, getUserName, loggedIn } from '../../api/auth';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    handleVisibleChange = isVisible => {
        this.setState({ isVisible });
    }

    handleLogout = event => {
        event.preventDefault();
        logout()
            .then(() => this.props.history.replace('/'))
            .catch(err => message.error(err))
    }

    render() {
        const userName = getUserName();
        const menu = (
            <Menu style={{ textAlign: "right" }}>
                <Menu.Item key="1">
                    <Link to="/admin/change-profile">Change Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/admin/change-password">Change Password</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" style={{ margin: 0 }}>
                    <a onClick={this.handleLogout}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                {loggedIn() &&
                    < Dropdown
                        overlay={menu}
                        trigger={['click']}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <div>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                            <span style={{ marginLeft: "10px", marginRight: "10px" }}>{userName}</span>
                            <Icon type="down" />
                        </div>
                    </Dropdown>
                }
            </div>
        )
    }
}

export default withRouter(Logout)