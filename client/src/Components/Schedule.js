import React, { Component } from 'react'
import Day from './Day'
import { ListRowInput, ListRow } from './ListItem'

class Schedule extends Component{
    constructor(props){
        super(props);

        const { schedule } = this.props;
        const converted = schedule.map(item => {
            const copy = {...item};
            let keys = Object.keys(copy);

            for(let key of keys){
                const time = this.convertFromMs(copy[key]);
                copy[key] = time;
            }

            return copy;
        });
        
        this.state = {
            schedule: converted
        }
    }

    map(x, in_min, in_max, out_min, out_max){
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    convertFromMs(item){
        const time = item / (3600 * 1000);
        const hours = Math.floor(time);
        const unconverted = Math.round((time - hours) * 100);
        const minutes = Math.round(this.map(unconverted, 0, 100, 0, 60));

        return {
            hours: hours,
            minutes: minutes
        }
    }

    render(){
        const { isAdmin, handler } = this.props;
        const Element = isAdmin ? ListRowInput: ListRow;

        return(
            <Day lessons={ this.state.schedule }
                element={ Element }
                value='schedule'
                name='schedule'
                handler={ handler }/>
        )
    }
}

export default Schedule