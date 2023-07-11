import React from "react";
import '../style/LayoutStyle.css';
import {message, Badge} from 'antd';
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Cursor } from "mongoose";
export default function Layout({children}){
    const {user} = useSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()

    // Logout
    const handleLogout = () =>{
        localStorage.clear()
        message.success(`Logout Successfully`)
        navigate('/login')
    }

    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu
    return(
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Med App</h6>
                            <hr/>
                        </div>
                        <div className="menu">
                            {SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && "active"}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                            <div className={`menu-item`} onClick={handleLogout}> 
                                            <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                                            <Link to='/login'>Logout</Link>
                            </div>
                        </div>
                    </div> 
                    <div className="content">
                        <div className="header">
                            <div className="header-content" style={{cursor:'pointer'}}>
                                {/* Adding Notifiaction Badge */}
                                <Badge 
                                    count={user && user.notification.length} 
                                    onClick={()=>{navigate('/notification');}}
                                >
                                    <i class="fa-solid fa-bell"></i>
                                </Badge>
                                
                                <Link to='/profile'>{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div> 
                </div> 
            </div>            
        </>
    )
}
