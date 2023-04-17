import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import './Login.css'
const LogIn = () => {


    const { signIn } = useContext(AuthContext)


    const HandleLogIn = (event) =>{
        event.preventDefault();

        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        signIn(email, password)
        .then(result=>{
            const loggedIn = result.user
            console.log(loggedIn)
            form.reset()
        })
        .catch(err => {
            console.log(err)
        })

    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>LogIn</h2>
            <form onSubmit={HandleLogIn}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" required/>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New To Ema-John?<Link to="/signup">Create New Account</Link></small></p>
        </div>
    );
};

export default LogIn;