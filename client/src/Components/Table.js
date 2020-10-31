import React, { Component } from 'react'
import Submit from './Submit'
import Day from './Day'
import Schedule from './Schedule'
import { ListItem, ListItemInput } from './ListItem'

class Table extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        
        this.props.handler('/timetable/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data)
        });
    }

    handleChange = event => {
        event.preventDefault();

        const { name, value } = event.target;
        this.changeState(name, value);
    }

    changeState = (prop, value) => {
        const updated = this.accessNestedObject(prop, this.state.data, value);

        this.setState({
            data: updated
        });
    }

    accessNestedObject(name, obj, value){
        const indexReg = /\[(.*?)\]/g;

        const property = name.match(/[^\[]*/); // eslint-disable-line no-useless-escape
        const indexes = [...name.matchAll(indexReg)];
        let ref;

        for(let i of indexes){
            const value = i[1];
            property.push(value)
        }
        
        for(let i = 0; i < property.length; i++){
            if(i === 0)
                ref = this.property(obj, property[i]).value;
            else if(i === property.length - 1)
                ref = this.property(ref, property[i]);
            else
                ref = this.property(ref, property[i]).value;
        }
    
        ref.value = value;

        return obj;
    }

    property(obj, prop){
        prop = prop == 0 ? 0 : (parseInt(prop, 10) || prop); // eslint-disable-line eqeqeq 
        
        return{
            get value(){
                return obj[prop]
            },
            set value(val){
                obj[prop] = val;
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render(){
        const { state, handleChange, changeState, handleSubmit } = this;
        const { data } = state;
        const { isAdmin } = this.props;
        
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const SubElement = isAdmin ? ListItemInput : ListItem;
        let i = 0;

        const props = {
            schedule: data.schedule
        }

        return(
            <form className="table">
                <Schedule isAdmin={ isAdmin }
                          handler={ changeState }
                          {...props}/>
                {
                    data.timetable.map(day => {
                        const formatted = days[i];
                        const Element = <Day lessons={ day }
                                            element={ SubElement }
                                            value={ formatted }
                                            key={ formatted }
                                            name={ `timetable[${i}]` }
                                            handler={ handleChange }
                                            isAdmin={ isAdmin } />
                        i++;
            
                        return Element
                    })
                }
                {isAdmin && <Submit handler={ handleSubmit }/>}
            </form>
        )
    }
}

export default Table