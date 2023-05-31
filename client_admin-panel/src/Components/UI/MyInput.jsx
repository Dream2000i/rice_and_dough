import { useState } from 'react';

export default function MyInput({
    value = '',
    setValue = f => f,
    validation = f => f,
    errors = '',
    type = 'text',
    pl = ''
}) {
    const [blur, setBlur] = useState(false);

    const validate = () => {
        setBlur(true);
        validation(value);
    }

    return (
        <>
            <input type={type} placeholder={pl} onInput={(e) => setValue(e.target.value)} value={value || ''} onBlur={validate} />
            {blur && errors && !value && <span className='error' style={{ color: "red" }}>{errors}</span>}

        </>
    );
}