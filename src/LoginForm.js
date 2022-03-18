import { performLogin } from "./util";
import styles from "./LoginForm.module.css";
import { useState } from "react";

// ================ LOGIN FORM ====================
//
// You are provided with an incomplete login form.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.
//
// Tasks:
//  * Login button should trigger the performLogin() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the performLogin() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the performLogin function to find out how to log in successfully.

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submit, setSubmit] = useState(false)

  const handleSubmit =async()=>{
    try {
      setSubmit(true)
      let response = await performLogin({email, password})
      if(!response){
        setSubmit(false)
        alert('Successful')
      }

    }catch(err){
     if(err){
      setSubmit(false)
       let error = await err
       setError(error.message)
     }
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <label htmlFor={"email"}>Email</label>
        <input id={"email"} type={"email"} onChange={(e)=> setEmail(e.target.value)}/>
      </div>
      <div className={styles.row}>
        <label htmlFor={"password"}>Password</label>
        <input id={"password"} type={"password"}  onChange={(e)=> setPassword(e.target.value)} />
      </div>

      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      <div className={styles.errorMessage} >{error}</div>

      <div className={styles.row}>
        <button onClick={handleSubmit} disabled={email.length < 1 || password.length <6 || submit}>Login</button>
      </div>
    </div>
  );
}
