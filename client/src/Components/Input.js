import React from 'react'

function Input(props){
    const { value, handler } = props;

    return(
        <input type={ value !== 'confirmation' ? value : 'password' }
               key={ value }
               name={ value }
               placeholder={ capitalizeFirstLetter(value) }
               required
               onChange={ handler }
               className='input'
        />
    )
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.substr(1);
}

export default Input