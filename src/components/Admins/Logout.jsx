import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { logout, getUserName } from '../../api/auth';

class Logout extends Component {
    handleLogout = event => {
        logout()
            .then(this.props.history.replace('/'));
    }

    render() {
        const userName = getUserName();
        const menu = (
            <Menu style={{ textAlign: "right" }}>
                <Menu.Item>
                    <Link to="/admin/change-profile">Change Profile</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/admin/change-password">Change Password</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item style={{ margin: 0 }}>
                    <a onClick={this.handleLogout}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu}>
                <div>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                    <span style={{ marginLeft: "10px", marginRight: "10px" }}>{userName}</span>
                    <Icon type="down" />
                </div>
            </Dropdown>
        )
    }
}

export default withRouter(Logout)