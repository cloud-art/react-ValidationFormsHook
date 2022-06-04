import React, { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    const [errorsList, setErrorsList] = useState([])

    const removeError = (errorType, eList) => {
        setErrorsList(eList.filter((e) => {
            return e.error !== errorType
        }))
    }
    const addError = (errorType, errorText, eList) => {
        setErrorsList([...eList, {error: errorType, text: errorText}])
    }
    const errorsListContains = (errorType, eList) => {
        const error = eList.find(err => { return err.error == errorType })
        return error
    }

    useEffect( () => {
        // Проходим по каждому условию валидации
        // Если текст проходит валидацию, то ошибка убирается
        // Если не проходит - добавляется в список ошибка 
        for(const validation in validations){
            switch (validation) {
                case 'empty':
                    if (value){
                        setIsEmpty(false)
                        removeError(validation, errorsList)
                    } else{
                        if (!errorsListContains(validation, errorsList)){
                            addError(validation, "Поле не может быть пустым", errorsList)
                        }
                    }
                    break;
                case 'minLength':
                    const minLength = validations['minLength']
                    if (value.length >= minLength){
                        setMinLengthError(false)
                        removeError(validation, errorsList)
                    } else{
                        setMinLengthError(true)
                        if (!errorsListContains(validation, errorsList)){
                            addError(validation, `Символов должно быть не менее ${minLength}`, errorsList)
                        }
                    }
                    break;
            }
        }
    }, [value])

    useEffect( () =>{
        errorsList.length > 0? setInputValid(false) : setInputValid(true)
    }, [errorsList])

    return {
        isEmpty,
        minLengthError,
        inputValid,
        errorsList
    }
}

export default useValidation