import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { logout, getUserName } from '../../api/auth';

class Logout extends Component {
    handleLogout = event => {
        logout()
            .then(this.props.history.replace('/'));
    }

    handleChangeProfile = event => {
        this.props.history.push('/admin/change-profile');
    }

    handleChangePassword = event => {
        this.props.history.push('/admin/change-password');
    }

    render() {
        const userName = getUserName();
        const menu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.handleChangeProfile}>
                        Change Profile
                    </span>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={this.handleChangePassword}>
                        Change Password
                    </span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <span onClick={this.handleLogout}>
                        Logout
                    </span>
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