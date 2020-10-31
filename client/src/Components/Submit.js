import React from 'react'

function Submit(props){
    return(
        <input type="submit" 
               value="Submit"
               className='submit'
               onClick={ props.handler } />
    )
}

export default Submit