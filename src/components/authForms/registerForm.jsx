import React from 'react'
import "./authForms.css"
import { useInput } from '../../hooks'



const RegisterForm = () => {
    const username = useInput('', {minLength: 5})
    const email = useInput('', {empty: false, isEmail: true})
    const password = useInput('', {minLength: 8})
    const rePassword = useInput('', {isConfirm: password.value})

    return(
        <form className='form-container'>
                <label htmlFor={"username"}>
                    <span className='form-label'>Username:</span>
                    <input 
                        value={username.value}
                        onChange={e => username.onChange(e)} 
                        onBlur={e => username.onBlur(e)}
                        type={"text"} 
                        id={"registerUsername"} 
                        name={"username"}/> 
                    {(username.isDirty) && 
                    <ul className='errors-ul'>
                        {username.errorsList.map((err, index) => {
                            return <li className='errors-li' key={index}>{err.text}</li>
                        })}
                    </ul>}
                </label>
                
                <label htmlFor={"email"}>
                    <span className='form-label'>Email:</span> 
                    <input
                        value={email.value} 
                        onChange={e => email.onChange(e)} 
                        onBlur={e => email.onBlur(e)}
                        type={"text"} 
                        id={"registerEmail"} 
                        name={"email"}/> 
                    {(email.isDirty) && 
                    <ul className='errors-ul'>
                        {email.errorsList.map((err, index) => {
                            return <li className='errors-li' key={index}>{err.text}</li>
                        })}
                    </ul>}
                </label>
                
                <label htmlFor={"password"}>
                    <span className='form-label'>Password:</span> 
                    <input 
                        value={password.value}
                        onChange={e => password.onChange(e)} 
                        onBlur={e => password.onBlur(e)}
                        type={"password"} 
                        id={"registerPassword"} 
                        name={"password"}/> 
                    {(password.isDirty) && 
                    <ul className='errors-ul'>
                        {password.errorsList.map((err, index) => {
                            return <li className='errors-li' key={index}>{err.text}</li>
                        })}
                    </ul>}
                </label>
                
                <label htmlFor={"confirmPassword"}>
                    <span className='form-label'>Retype password:</span> 
                    <input 
                        value={rePassword.value}
                        onChange={e => rePassword.onChange(e)} 
                        onBlur={e => rePassword.onBlur(e)}
                        type={"password"} 
                        id={"registerRePassword"} 
                        name={"rePassword"}/> 
                    
                    {(rePassword.isDirty) && 
                    <ul className='errors-ul'>
                        {rePassword.errorsList.map((err, index) => {
                            return <li className='errors-li' key={index}>{err.text}</li>
                        })}
                    </ul>}
                </label>

                <button 
                    className=''
                    disabled={
                        !username.inputValid || 
                        !email.inputValid || 
                        !password.inputValid || 
                        !rePassword.inputValid
                    } 
                    type={"submit"}>
                        Register
                </button>
            
                <div className="form-ending">
                    <button type={"button"} className={"cancelbtn"}>Cancel</button>
                </div>

        </form>
    )
}

export default RegisterForm