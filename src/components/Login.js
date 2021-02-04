import React, { Component } from 'react'
import { Form, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css'
import store from '../redux/store'
import auth from '../redux/actions/auth'

class Login extends Component {
    state = {
        username: '',
        password: '',
      
    }
    login = (e) => {
        e.preventDefault()

        const { username, password } = this.state
        const data = {
            password,
            username,
        }
        store.dispatch(auth.login(data))
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
                            <span>Please login with your account</span>
                        </div>
                    </div>
                    <Form onSubmit={this.login}>
                        <Input onChange={this.onChangeText} name='username' type='username' id='username' placeholder='username' />
                        <Input className='mt-3' onChange={this.onChangeText} name='password' type='password' id='password' placeholder='Password' />
                        <div className=' text-right mt-3'>
                            <Link to='/' className='forgot'>Forgot Password?</Link>
                        </div>
                        <button type='submit' className='mt-3 bgBtn rounded-pill'>Login</button>
                    </Form>
                    <div class="text-center quest-wrapper mt-3">
                        <span>Don't have any account? </span> <Link to='/register' className='forgot' >Register</Link>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    login: auth.login
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps, mapDispatchToProps)(Login)
