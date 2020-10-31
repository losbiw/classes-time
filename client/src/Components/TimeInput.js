import React from 'react'
import Time from './Time'

function TimeInput(props){
    const { object, handler, value, isFirst } = props;
    const { hours, minutes } = value;

    return(
        <div style={{ display: 'flex' }}>
            <Time value={ hours } max='23' obj={ object } name='hours' handler={ handler }/>
            <div>:</div>
            <Time value={ minutes } max='59' obj={ object } name='minutes' handler={ handler }/>
            { isFirst && <div>&nbsp;-&nbsp;</div> }
        </div>
    )
}

export default TimeInput