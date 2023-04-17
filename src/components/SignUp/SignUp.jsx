import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState('')
    const { createUser } = useContext(AuthContext)


    const handleSignUp = (event) => {
        event.preventDefault();

        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value
        console.log(email, password, confirm)
        setError('')
        if(password !== confirm){
            setError('yor password did not matched')
            return
        }
        else if(password < 6){
            setError('password must be at least 6 character or longer')
            return
        }
            createUser(email,password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }

    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>
        <form onSubmit={handleSignUp}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" required/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" required/>
            </div>
            <div className="form-control">
                <label htmlFor="confirm">Confirm Password</label>
                <input type="password" name="confirm" id="" required/>
            </div>
            <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
        <p><small>Already have an account?<Link to="/login">Login</Link></small></p>
        <p className='text-error'>{error}</p>
    </div>
    );
};

export default SignUp;