import React from 'react'

function Select(props){
    const { value, handler, className } = props;
   
    const forms = [];
    
    for(let i = 1; i <= 11; i++){
        let char = 'А'.charCodeAt(0);

        for(let y = 0; y < 3; y++){
            const symbol = String.fromCharCode(char);
            const form = i + symbol;
            forms.push(form);
            char++;
        }
    }

    return(
        <select onChange={ handler } defaultValue={ value } name="form" className={ className }>
            {
                forms.map(schoolClass => {
                    return <option value={ schoolClass } key={ schoolClass }>
                        { schoolClass }
                    </option>
                })
            }
        </select>
    )
}

export default Select