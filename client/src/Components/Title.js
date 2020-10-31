import React from 'react'

function Title(props){
    const { name } = props;
    return(
        <h1 className={ `title-${name}` }>{ capitalizeFirstLetter(props.value) }</h1>
    )
}

function capitalizeFirstLetter(string){
    if(string)
        return string.charAt(0).toUpperCase() + string.substr(1);
    else return null
}

export default Title