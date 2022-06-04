import React, { useState } from 'react';
import useValidation from './useValidation';

const useInput = ( InitialValue, validations ) => {
    const [ value, setValue ] = useState( InitialValue )
    const [ isDirty, setIsDirty ] = useState( false )
    const valid = useValidation( value, validations )

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return{
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export default useInput