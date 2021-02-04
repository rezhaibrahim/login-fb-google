import React, { Component } from 'react'
import { Form, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css'
import store from '../redux/store'
import auth from '../redux/actions/auth'

class Register extends Component {
    state = {
        email:'',
        username: '',
        password: '',
      
    }
    register = (e) => {
        e.preventDefault()

        const { email,username, password } = this.state
        const data = {
            email,
            password,
            username,
        }
        store.dispatch(auth.register(data))
    }
    
    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidUpdate() {
        this.props.auth.isLogin && this.props.history.push(
            this.props.location.state === undefined
                ? '/'
                : this.props.location.state.location)
    }

    render() {
        // console.log(this.props.match.path)
        return (
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <div style={{ width: 400 }}>
                    <div className='header-login text-center'>
                        <div className='message mb-4'>
                            <span>Please Register</span>
                        </div>
                    </div>
                    <Form onSubmit={this.register}>
                        <Input onChange={this.onChangeText} name='email' type='email' id='email' placeholder='email' />
                        <Input className='mt-3' onChange={this.onChangeText} name='password' type='password' id='password' placeholder='Password' />
                        <Input className='mt-3' onChange={this.onChangeText} name='username' type='text' id='username' placeholder='username' />
                        
                        <button type='submit' className='mt-3 bgBtn rounded-pill'>Register</button>
                    </Form>
                    <div class="text-center quest-wrapper mt-3">
                        <span> have any account? </span> <Link to='/login' className='forgot' >Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    register: auth.register
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps, mapDispatchToProps)(Register)
