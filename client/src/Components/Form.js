import React from 'react'
import Input from './Input'
import Submit from './Submit'
import Select from './Select'
import Warning from './Warning'

function Form(props){
    const inputs = ['email', 'password'];
    const { handleSubmit, handleChange } = props.handlers;
    
    if(!props.isLogin){
        inputs.push('confirmation')
    }

    return(
        <form className="login-form" onSubmit={ handleSubmit }>
            { !props.isLogin &&
                <Select handler={ handleChange }
                        className='input'/>
            }
 
            {
                inputs.map(input => {
                    return <Input value={ input } 
                                  key={ input }
                                  handler={ handleChange } />
                })
            }

            <Warning value={ props.warning } />

            <Submit />
        </form>
    )
}

export default Form