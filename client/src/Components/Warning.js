import React from 'react'

function Warning(props){
    return(
        <p className='warning'>{ props.value || '‏‏‎ ‎' }</p>
    )
}

export default Warning