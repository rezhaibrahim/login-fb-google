import React, { Component } from 'react'
import { Form, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css'
import store from '../redux/store'
import auth from '../redux/actions/auth'
import GoogleLogin from 'react-google-login'
import FacebookLogin from "react-facebook-login";
import axios from 'axios'
class Login extends Component {
    state = {
        username: '',
        password: '',

    }

 authenticate = async (access_token) =>{
     await axios.get(
        "http://localhost:8080/auth/facebook",
        {
            params: { access_token }
        }
    );
};

responseFacebook = async (response) => {
    this.authenticate(response.accessToken);
};

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

responseGoogle = (response) => {
    console.log(response);
    console.log("checkin",response.profileObj);


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
                    <button type='submit'  className='mx-5 mt-3 '><FacebookLogin
                        appId="942329836604080"
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    /></button>
                    <button type='submit'  className='mt-3 mx-5 '><GoogleLogin
                        clientId="1053160585228-cgcc8sdgdo416ff8s8pg8psui85sg8hg.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'} />
                    </button>

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
