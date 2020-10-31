import React, { Component } from 'react';
import Login from './Components/Login'
import User from './Components/User'

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      userData: null
    }
  } 

  async fetchAPI(address, options){
    const req = await fetch(address, options);
    const res = await req.json();

    return res;
  }
  
  fetchDataToState = (address, data, method, property) => {
    const { fetchAPI } = this;

    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    if(method !== 'get')
      options.body = data;

    return new Promise(resolve => {
      fetchAPI(address, options)
      .then(data => JSON.parse(data))
      .then(json => {
        const updated = this.state.userData || {};
        updated[property] = json; 
        
        this.setState(updated, () => resolve());
      })
    })
  }

  getFromLocal(){
    return localStorage.getItem('login');
  }

  async componentDidMount(){
    const { getFromLocal, fetchDataToState } = this;
    const localData = getFromLocal();
    
    if(localData)
      await fetchDataToState('/account/login', localData, 'post', 'userData');
  }

  renderUser(timetable){
    const { fetchAPI, state } = this;
    const { general, auth } = state.userData;
    
    const loginData = {
      email: auth.email,
      password: auth.password
    }
    const localData = JSON.stringify(loginData);

    if(!this.getFromLocal()){
      localStorage.setItem('login', localData);
    }
    
    return(
      <User general={ general }
            timetable={ timetable }
            handler={ fetchAPI }
            auth={ loginData }/>
    )
  }
  
  render(){
    const { fetchDataToState, state } = this;
    const { userData } = state;

    if(userData?.general && userData?.form?.timetable){
      return this.renderUser(userData.form);
    }
    else if(userData?.general?.isAdmin){
      const schedule = Array(8).fill({
        beginning: 0,
        ending: 0
      });
      const subArray = Array(8).fill('');
      const timetable = Array(5).fill(subArray);

      const form = {
        schedule: schedule,
        timetable: timetable,
        form: userData.general.form,
        isGenerated: true,
        showTableFirst: true
      }
      
      return this.renderUser(form);
    }
    else if(userData?.general){
      return this.renderUser({ 
        isGenerated: true,
        removeSwitch: true
      });
    }
    else{
      const warning = userData?.warning;

      return(
        <Login handler={ fetchDataToState }
               warning={ warning }/>
      )
    }
  }
}

export default App