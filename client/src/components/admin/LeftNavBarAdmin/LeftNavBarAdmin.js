import React from "react";

import {Nav, NavLink} from "react-bootstrap";
import {IoHome} from 'react-icons/io5'
import {AiOutlineAppstoreAdd,AiFillSetting} from 'react-icons/ai'
import {RiBillLine} from 'react-icons/ri'
import {GoGraph} from 'react-icons/go'
import {useLocation} from "react-router-dom";
import { style } from "@mui/system";

const LeftMenuAdmin = ()=> {

        const location = useLocation();
        const path = location.pathname.split('/')[1];

        return <>
                {}
                <nav class="pcoded-navbar">
                        <div class="navbar-wrapper">
                        <div class="navbar-brand header-logo">
                                <a href="index.html" class="b-brand">
                                <div class="b-bg">
                                        <i class="feather icon-video"></i>
                                </div>
                                <span class="b-title">Campus Surveillance</span>
                                </a>
                                {}
                        </div>
                        <div class="navbar-content scroll-div">
                                <ul class="nav pcoded-inner-navbar">
                                <li class="nav-item pcoded-menu-caption">
                                        <label style={{ color: 'white' }}>Navigation</label>
                                </li>
                                {}
                                <li data-username="Sample Page" class={path === 'adminDashboard' ? 'nav-item active' : 'nav-item'}><NavLink href='/adminDashboard' ><span class="pcoded-micon"><i class="feather icon-home"></i></span><span class="pcoded-mtext">Admin Dashboard</span></NavLink></li>
                                <li data-username="Sample Page" class={path === 'viewAllUsers' ? 'nav-item active' : 'nav-item'}><NavLink href='/viewAllUsers' ><span class="pcoded-micon"><i class="feather icon-sidebar"></i></span><span class="pcoded-mtext">List Campus Security Officers</span></NavLink></li>
                                <li data-username="Sample Page" class={path === 'addUser' ? 'nav-item active' : 'nav-item'}><NavLink href='/addUser' ><span class="pcoded-micon"><i class="feather icon-user-plus"></i></span><span class="pcoded-mtext">Add New Campus Security Officers</span></NavLink></li>
                                <li data-username="Sample Page" class={path === 'manageUsers' ? 'nav-item active' : 'nav-item'}><NavLink href='/manageUsers' ><span class="pcoded-micon"><i class="feather icon-user-x"></i></span><span class="pcoded-mtext">Manage Campus Security Officers</span></NavLink></li>
                                <li data-username="Sample Page" class={path === 'viewRequests' ? 'nav-item active' : 'nav-item'}><NavLink href='/viewRequests' ><span class="pcoded-micon"><i class="feather icon-settings"></i></span><span class="pcoded-mtext">Manage Maintenance Requests</span></NavLink></li>
                                <li data-username="Sample Page" class={path === 'adminDashboard' ? 'nav-item active' : 'nav-item'}><NavLink href='/adminDashboard' ><span class="pcoded-micon"><i class="feather icon-shield"></i></span><span class="pcoded-mtext">Roles and Permissions</span></NavLink></li>
                                <li data-username="Sample Page" class={path === 'adminDashboard' ? 'nav-item active' : 'nav-item'}><NavLink href='/adminDashboard' ><span class="pcoded-micon"><i class="feather icon-file"></i></span><span class="pcoded-mtext">User Activity Log</span></NavLink></li>
                                </ul>
                        </div>
                        </div>
                </nav>
        </>
}

export default LeftMenuAdmin;
