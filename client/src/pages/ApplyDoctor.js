import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'

const ApplyDoctor = () =>{
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // Handle Form
    const handleFinish = async(values) =>{
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.success)
                navigate('/')
            }
            else{
                message.error(res.data.success)
            }
            

        }catch(error){
            console.log(error)
            message.error('Something Went Wrong')
        }
    }
    return(
        <Layout>
            <h1 className='text-center'> Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h4 className='text-dark'>Personal Details</h4>
                <Row gutter={24}>
                    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='First Name' name='firstname' required rules={[{required:true}]}>
                            <Input type='text' placeholder='Your First Name'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Last Name' name='lastname' required rules={[{required:true}]}>
                            <Input type='text' placeholder='Your Last Name'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Phone' name='phone' required rules={[{required:true}]}>
                            <Input type='phone' placeholder='Your Phone Number'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Email' name='email' required rules={[{required:true}]}>
                            <Input type='email' placeholder='Your Email ID'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Website' name='website'>
                            <Input type='text' placeholder='Your Website'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Address' name='address' required rules={[{required:true}]}>
                            <Input type='text' placeholder='Your Place Address'/>
                        </Form.Item>
                    </Col>
                    
                </Row>
                <h4 className='text-dark'>Professional Details</h4>
                <Row gutter={24}>
                    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Specialization' name='specialization' required rules={[{required:true}]}>
                            <Input type='text' placeholder='Your specialization'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Experience' name='experience' required rules={[{required:true}]}>
                            <Input type='text' placeholder='Your experience'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Fess per Cunsalation' name='feesPerCunsaltation' required rules={[{required:true}]}>
                            <Input type='number' placeholder='Your Fees'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Timing' name='timing' required rules={[{required:true}]}>
                            <TimePicker.RangePicker format='HH:mm'/>
                        </Form.Item>
                    </Col>
                    
                   
                    
                </Row>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary  form-btn' type='submit'>Submit</button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor