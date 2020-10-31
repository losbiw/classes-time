import React, { Component } from 'react'
import Title from './Title'
import Form from './Form'
import Button from './Button'

class Login extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            inputData: {
                form: '1А'
            },
            warning: '',
            isLogin: true
        }
    }

    componentDidUpdate(prevProps){
        const { warning } = this.props;

        if (warning !== prevProps.warning) {
          this.setState({
              warning: warning
          });
        }
      }

    changeAction = () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    handleChange = event => {
        event.preventDefault();

        const { name, value } = event.target;
        const inputData = this.state.inputData;
        
        const data = inputData ? inputData : {};
        data[name] = value;

        this.setState({
            inputData: data
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const { handler } = this.props;
        const { inputData, isLogin } = this.state;
        const { password, confirmation } = inputData;

        const json = JSON.stringify(inputData);

        if(isLogin){
            handler('/account/login', json, 'post', 'userData');
        }
        else if(password === confirmation){
            handler('/account/signup', json, 'post', 'userData');
            this.setState({
                isLogin: true
            });
        }
        else{
            this.setState({
                warning: 'The passwords should match'
            });
        }
    }

    render(){
        const { state, changeAction, handleSubmit, handleChange } = this;
        const { isLogin, warning } = state;

        return(
            <div className="login-container">
                <div className="login">
                    <Title value={ isLogin ? 'Log In' : 'Sign Up' }
                        name="login" />
                    <Form 
                        isLogin={ isLogin } 
                        handlers={{
                            handleSubmit: handleSubmit,
                            handleChange: handleChange}}
                        warning={ warning }/>
                    <Button value={ isLogin
                                    ? "Don't have an account? Sign Up"
                                    : 'Already have an account? Log In' } 
                            handler={ changeAction }
                            className="change-action" />
                </div>
            </div>
        )
    }
}

export default Login