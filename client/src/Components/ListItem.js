import React, { Component } from 'react'
import TimeInput from './TimeInput'

function ListItem(props){
    return(
        <li>
            { props.value }
        </li>
    )
}

function ListRow(props){
    const data = props.value;
    const keys = Object.keys(data);
    let isFirst = true;
    
    return(
        <li className="time-item">
            { 
                keys.map(key => {
                    const { hours, minutes } = data[key];
                    const formatted = formatTime(minutes);

                    const Element = <div style={{display: 'flex'}} key={ key }>
                                        <div>{hours}:{formatted}</div>
                                        { isFirst && <div>&nbsp;-&nbsp;</div> }
                                    </div>

                    isFirst = false;
                    
                    return Element;
                })
            }
        </li>
    )
}

function ListItemInput(props){
    const { value, name, handler } = props;

    return(
        <li>
            <input type="text" 
                   defaultValue={ value } 
                   name={ name }
                   onChange={ handler }
                   className="item-input"/>
        </li>
    )
}

class ListRowInput extends Component{
    constructor(props){
        super(props);

        this.state = {
            beginning: {},
            ending: {}
        }
    }

    map(x, in_min, in_max, out_min, out_max){
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    componentDidMount(){
        const data = this.props.value;
        const keys = Object.keys(data);
        
        for(const key of keys){
            const minutes = data[key].minutes;
            data[key].minutes = formatTime(minutes);
        }

        this.setState(data);
    }

    handler = event => {
        event.preventDefault();
        const { handler, name: propName } = this.props;
        const { name, value } = event.target;
        const property = event.target.getAttribute('obj')

        const parsed = value == 0 ? 0 : (parseInt(value, 10) || value); // eslint-disable-line eqeqeq
        const data = {...this.state};
        data[property][name] = parsed;

        this.setState(data, () => {
            const keys = Object.keys(this.state);
            let converted = {};
            
            for(const key of keys){
                const { hours, minutes } = this.state[key];
                converted[key] = this.convertIntoMs(hours, minutes);
             }

            handler(propName, converted);
        });
    }

    convertIntoMs(hours, minutes){
        minutes = this.map(minutes, 0, 60, 0, 100) * 0.01;
        const time = hours + minutes;
        const timeInMs = Math.round(time * (3600* 1000));
        
        return timeInMs;
    }

    render(){
        const data = this.state;
        const keys = Object.keys(data);
        let isFirst = true;
        
        return(
            <li className='time-item-input'>
                {
                    keys.map(key => {
                        const Element = <TimeInput value={ data[key] }
                                                    handler={ this.handler }
                                                    isFirst={ isFirst }
                                                    object={ key }
                                                    key={ key }/>
                        isFirst = false;
                        return Element
                    })
                }
            </li>
        )
    }
}

function formatTime(minutes){
    const str = minutes?.toString();
    const formatted = str?.length < 2 ? '0' + str : str;

    return formatted;
}

export {
    ListItem,
    ListItemInput,
    ListRowInput,
    ListRow
}