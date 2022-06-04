import React, { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
    const [isEmptyError, setIsEmptyError] = useState(false)
    const [minLengthError, setMinLengthError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isConfirmError, setIsConfirmError] = useState(false)
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
                        setIsEmptyError(false)
                        removeError(validation, errorsList)
                    } else{
                        if (!errorsListContains(validation, errorsList)){
                            addError(validation, "Поле не может быть пустым", errorsList)
                        }
                        setIsEmptyError(true)
                    }
                    break;
                case 'minLength':
                    const minLength = validations[validation]
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
                case 'isEmail':
                    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                    if (value.match(re)){
                        setIsEmailError(false)
                        removeError(validation, errorsList)
                    } else{
                        setIsEmailError(true)
                        if (!errorsListContains(validation, errorsList)){
                            addError(validation, `Запись не похожа на email`, errorsList)
                        }
                    }
                    break;
                case 'isConfirm':
                    const v = validations[validation]
                    if(value == v && value !== ''){
                        setIsConfirmError(false)
                        removeError(validation, errorsList)
                    }else{
                        setMinLengthError(true)
                        if (!errorsListContains(validation, errorsList)){
                            addError(validation, `Записи не похожи`, errorsList)
                        }
                    }
            }
        }
    }, [value])

    useEffect( () =>{
        errorsList.length > 0? setInputValid(false) : setInputValid(true)
    }, [errorsList])

    return {
        isEmptyError,
        minLengthError,
        isEmailError,
        inputValid,
        errorsList
    }
}

export default useValidation