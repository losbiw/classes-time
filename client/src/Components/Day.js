import React from 'react'
import Title from './Title'

function Day(props){
    const { value, isAdmin, lessons, name, handler } = props;
    const Element = props.element;
    let i = 0;

    return(
        <div className='day'>
            <Title value={ value } name='day'/>
            
            <ol>
            {
                lessons.map(lesson => {
                    if(lesson || isAdmin){
                        const key = `${ value }${i}`;

                        const Lesson = <Element value={ lesson }
                                                key={ key }
                                                name={ `${name}[${i}]` }
                                                handler={ handler }/>
                        i++;
                        return Lesson;
                    }
                    return undefined
                })
            }
            </ol>
        </div>
    )
}

export default Day