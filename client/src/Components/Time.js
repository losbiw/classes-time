import React from 'react'

function Time(props){
    const { max, value, name, handler, obj } = props;

    return(
        <input type="number" 
               min='0' 
               max={ max } 
               defaultValue={ value }
               onChange={ handler }
               obj={ obj }
               name={ name }/>
    )
}

export default Time