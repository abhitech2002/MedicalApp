import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from 'antd'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead = async(req, res) =>{
        try{
            dispath(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification', 
                {userId: user._id},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )   
            dispath(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
        }catch(error){
            dispath(hideLoading())
            console.log(error)
            message.error('Somrthing went Wrong')
        }
    }
    // Delete notification
    const handleDeleteAllRead = async(req, res) =>{
        try{
            dispath(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id}, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispath(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
        }catch(error){
            dispath(hideLoading())
            console.log(error)
            message.error('Something Went Wrong')
        }
    }

    return(
        <Layout>
            <h4 className="m-4">Notifiaction Page</h4>
            <Tabs>
                <Tabs.TabPane tab="UnRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map(notificationMgs => (
                            <div className="card"  style={{cursor: 'pointer'}}>
                                <div className="card-text" onClick={()=>navigate(notificationMgs.onClickPath)}>
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-primary " style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.seen_notification.map(notificationMgs => (
                            <div className="card"  style={{cursor: 'pointer'}}>
                                <div className="card-text" onClick={()=>navigate(notificationMgs.onClickPath)}>
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage