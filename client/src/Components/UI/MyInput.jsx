import { useState } from 'react';

export default function MyInput({
    value = '',
    setValue = f => f,
    validation = f => f,
    errors = '',
    focus = f => f
}) {
    const [blur, setBlur] = useState(false);

    const validate = () => {
        setBlur(true);
        validation(value);
    }


    return (
        <>
            <input type="text" onInput={(e) => setValue(e.target.value)} value={value || ''} onBlur={validate} onFocus={focus} />
            <span className='error' style={
                (blur && errors && !value) ?
                    { visibility: 'visible' }
                    :
                    {  }

            }>{errors}</span>

        </>
    );
}