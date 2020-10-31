import React, { Component } from 'react'
import Table from './Table'
import Button from './Button'
import Title from './Title'
import Select from './Select'
import { ReactSVG } from 'react-svg'

class User extends Component{
    constructor(props){
        super(props);

        const { getMsSinceMidnight, getCurrentDay, getCurrentLesson } = this;
        const { timetable, schedule, isGenerated } = this.props.timetable;
        let currentLesson = "The timetable doesn't exist";

        if(!isGenerated){
            const time = getMsSinceMidnight();
            const day = getCurrentDay();
            const lesson = getCurrentLesson(time, schedule, timetable[day]);

            currentLesson = lesson;
        }

        this.state = {
            currentLesson: currentLesson,
            isTableVisible: false
        }
    }

    getCurrentDay(){
        const date = new Date();
        const day = (date.getDay() + 6) % 7;
        
        return day;
    }

    getMsSinceMidnight(){
        const d = new Date(), e = new Date(d);
        const msSinceMidnight = e - d.setHours(0, 0, 0, 0);

        return msSinceMidnight;
    }

    getCurrentLesson(time, schedule, timetable){
        if(timetable){
            if(time < schedule[0].beginning){
                return `The first lesson is ${timetable[0]}`
            }
            else if(time >= schedule[timetable.length - 1].ending){
                return "Time to go home"
            }
            else{
                for(let i = 0; i < schedule.length; i++){
                    if(time >= schedule[i].ending && time < schedule[i + 1].ending){
                        return timetable[i + 1] || 'Time to go home'
                    } 
                }
                return timetable[0]
            }
        }
        else{
            return "It's a day off"
        }
    }

    changeState = (property, value) =>{
        const updated = {};
        updated[property] = value;
        
        this.setState(updated)
    }

    changetableState = () =>{
        const value = !this.state.isTableVisible;
        this.changeState('isTableVisible', value);
    }
    
    logoutHandler = () =>{
        localStorage.removeItem('login');
        window.location.reload();
    }

    selectChange = async(event) =>{
        const { value } = event.target;
        const { email, password } = this.props.auth;

        await this.props.handler('/account/form', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                form: value
            })
        });
        window.location.reload();
    }

    render(){
        const { state, props, changetableState, logoutHandler, selectChange } = this;
        const { general, timetable, handler } = props;

        const images = {
            list: 'list',
            logout: 'logout'
        }

        for(let img in images){
            images[img] = <ReactSVG src={ `icons/${img}.svg` } />
        }

        return(
            <div className="user">
                <nav>
                    <Select value={ general.form }
                        handler={ selectChange }
                        className="user-select"/>
                    
                    <div className="buttons">
                        {!timetable.removeSwitch && 
                            <Button handler={ changetableState } 
                                value={ images.list }
                                className="user-button"/>
                        }
                        <Button handler={ logoutHandler }
                            value={ images.logout }
                            className="user-button"/>
                    </div>
                </nav>
                {state.isTableVisible 
                    ? <Table data={ timetable }
                             isAdmin={ general.isAdmin }
                             handler={ handler }/> 
                    : <Title value={ state.currentLesson }
                             name="user"/>
                }
            </div>
        )
    }
}

export default User