import React from "react";
import styles from "./LoginScreen.module.css";
import Button from '../Shared/Button/Button';
import axios from 'axios';



class LoginScreen extends React.Component {
  state = {
    logOrReg: "register",
    userNameLogin: "",
    userNameReg: "",
    passwordReg: "",
    confirmPass: "",
    userNameLogin: "",
    passwordLogin: "",
    fullName: ""
  }

  setLogin = () => {
    this.setState({logOrReg: "login"})
  }

  setRegister = () => {
    this.setState({logOrReg: "register"})
  }

  login = () => {
    axios.post('api/auth/login', {userName: this.state.userNameLogin, password: this.state.passwordLogin}).then(
      response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.props.history.push("/schedule") 
        }
      }
    )
  }

  register = () => {
    if (this.state.passwordReg !== this.state.confirmPass) {
      this.setState({error: "Passwords do not match"})
    }
    axios.post('api/usersSignup', {userName: this.state.userNameReg, password: this.state.passwordReg, fullName: this.state.fullName}).then(
      response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.props.history.push('/schedule')
        }
      }
    )
  }

  setUserNameReg = (e) => {
    this.setState({userNameReg: e.target.value})
  }

  setFullName = (e) => {
    this.setState({fullName: e.target.value})
  }

  setUserNameLogin = (e) => {
    this.setState({userNameLogin: e.target.value})
  }


  setPasswordLogin = (e) => {
    this.setState({passwordLogin: e.target.value})
  }

  setPasswordReg = (e) => {
    this.setState({passwordReg: e.target.value})
  }

  setConfirmPass = (e) => {
    this.setState({confirmPass: e.target.value})
  }




  render() {
    return (
      <div className={styles.backGreen}>
        <p id={styles.mfcTennisHeader}>MFC Tennis Schedule</p>
        <div id={styles.loginReg}>
          <p onClick={this.setLogin} style={{backgroundColor: this.state.logOrReg === 'register' ? 'lightgray' : "", border: this.state.logOrReg === 'register' ? 'none' : "",}} className={styles.tabs}>Login</p>
          <p onClick={this.setRegister} style={{backgroundColor: this.state.logOrReg === 'login' ? 'lightgray' : "", border: this.state.logOrReg === 'login' ? 'none' : "",}} className={styles.tabs}>Register</p>
        </div>
        <div id={styles.loginRegBox}>
         
         {this.state.logOrReg === "register" && <div id={styles.reggy}>
            <input onChange={this.setFullName} className={styles.innys} placeholder="Full Name"/>
            <input onChange={this.setUserNameReg} className={styles.innys} placeholder="User Name"/>
            <input onChange={this.setPasswordReg} type="password" className={styles.innys} placeholder="Password"/>
            <input onChange={this.setConfirmPass} type="password" className={styles.innys} placeholder="Confirm Password"/>
            <Button onClick={this.register}>Register</Button>
          </div>}

          {this.state.logOrReg === "login" && <div id={styles.loggy}>
            <input onChange={this.setUserNameLogin} className={styles.innys} placeholder="Full Name"/>
            <input onChange={this.setPasswordLogin} type="password" className={styles.innys} placeholder="Password"/> 
            <Button onClick={this.login}>Login</Button>
          </div>}
        </div>
      </div>
    );
  }
}

export default LoginScreen;
