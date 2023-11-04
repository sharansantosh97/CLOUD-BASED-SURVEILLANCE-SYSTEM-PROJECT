import React from "react"

import { Nav, NavLink } from "react-bootstrap"
import { IoHome } from "react-icons/io5"
import { AiOutlineAppstoreAdd, AiFillSetting } from "react-icons/ai"
import { RiBillLine } from "react-icons/ri"
import { useLocation } from "react-router-dom"

import { GoGraph } from "react-icons/go"
const LeftMenu = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]

  return (
    <>
      {}

      <nav class='pcoded-navbar'>
        <div class='navbar-wrapper'>
          <div class='navbar-brand header-logo'>
            <a href='index.html' class='b-brand'>
              <div class='b-bg'>
                <i class='feather icon-video'></i>
              </div>
              <span class='b-title'>Campus Surveillance</span>
            </a>
            {}
          </div>
          <div class='navbar-content scroll-div'>
            <ul class='nav pcoded-inner-navbar'>
              <li class='nav-item pcoded-menu-caption'>
                <label style={{ color: "white" }}>Navigation</label>
              </li>
              {}
              <li
                data-username='Sample Page'
                class={path === "home" ? "nav-item active" : "nav-item"}
              >
                <NavLink href='/home'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-home'></i>
                  </span>
                  <span class='pcoded-mtext'>Home</span>
                </NavLink>
              </li>
              {/* <li
                data-username='Sample Page'
                class={
                  path === "deviceManagement" ? "nav-item active" : "nav-item"
                }
              >
                <NavLink href='/deviceManagement'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-camera'></i>
                  </span>
                  <span class='pcoded-mtext'>Camera Management</span>
                </NavLink>
              </li> */}
              <li
                data-username='Sample Page'
                class={
                  path === "controlConfigure" ? "nav-item active" : "nav-item"
                }
              >
                <NavLink href='/controlConfigure'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-server'></i>
                  </span>
                  <span class='pcoded-mtext'>Control & Configure</span>
                </NavLink>
              </li>
              <li
                data-username='Sample Page'
                class={path === "monitor" ? "nav-item active" : "nav-item"}
              >
                <NavLink href='/monitor'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-monitor'></i>
                  </span>
                  <span class='pcoded-mtext'>Monitor and Tracking</span>
                </NavLink>
              </li>
              
              <li
                data-username='Sample Page'
                class={path === "billing" ? "nav-item active" : "nav-item"}
              >
                <NavLink href='/billing'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-file-text'></i>
                  </span>
                  <span class='pcoded-mtext'>Billing Dashboard</span>
                </NavLink>
              </li>
              <li
                data-username='Sample Page'
                class={path === "service" ? "nav-item active" : "nav-item"}
              >
                <NavLink href='/service'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-alert-triangle'></i>
                  </span>
                  <span class='pcoded-mtext'>Maintenance Request</span>
                </NavLink>
              </li>
              <li
                data-username='Sample Page'
                class={
                  path === "dataManagement" ? "nav-item active" : "nav-item"
                }
              >
                <NavLink href='/dataManagement'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-play-circle'></i>
                  </span>
                  <span class='pcoded-mtext'>
                    Data Management and Retreival
                  </span>
                </NavLink>
              </li>
              <li
                data-username='Sample Page'
                class={
                  path === "alert" ? "nav-item active" : "nav-item"
                }
              >
                <NavLink href='/alert'>
                  <span class='pcoded-micon'>
                    <i class='feather icon-alert-circle'></i>
                  </span>
                  <span class='pcoded-mtext'>
                    Alert Dashboard
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default LeftMenu
