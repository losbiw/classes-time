import React from 'react'

function ChangeAction(props){
    const { handler, value, className } = props;

    return(
        <button className={ className }
                onClick={ handler }>
            { value }
        </button>
    )
}

export default ChangeAction