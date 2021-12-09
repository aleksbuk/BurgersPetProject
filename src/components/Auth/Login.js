import React from "react";
import PropTypes from 'prop-types';


const Login = props => {
    return (
        <div className='login-container'>
            <nav className='login'></nav>
            <h2>Authorization</h2>
            <p>Enter your login and Password from your GitHub</p>
            <button className='github'
            onClick={()=>props.authenticate()}
            >
                Login
            </button>
        </div>
    )
}
Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login