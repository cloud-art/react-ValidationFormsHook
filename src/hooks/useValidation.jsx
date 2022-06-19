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
        // Если не проходит - меняем state ошибки на true
        for(const validation in validations){
            switch (validation) {
                case 'empty':
                    value? setIsEmptyError(false) : setIsEmptyError(true)
                    break
                case 'minLength':
                    const minLength = validations[validation]
                    value.length >= minLength? setMinLengthError(false) : setMinLengthError(true)
                    break
                case 'isEmail':
                    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                    value.match(re)? setIsEmailError(false) : setIsEmailError(true)
                    break
                case 'isConfirm':
                    const v = validations[validation]
                    value === v? setIsConfirmError(false) : setIsConfirmError(true)
                    break
            }
        }
    }, [value])

    // если ошибка появляется или пропадает, заносим в массив ошибок название и текст

    useEffect( () => {
        const validation = 'empty'
        isEmptyError == true ? addError(validation, "Поле не может быть пустым", errorsList) : removeError(validation, errorsList)
    }, [isEmptyError])

    useEffect( () => {
        const validation = 'minLength'
        minLengthError == true ? addError(validation, `Символов должно быть не менее ${validations[validation]}`, errorsList) : removeError(validation, errorsList)
    }, [ minLengthError])

    useEffect( () => {
        const validation = 'isEmail'
        isEmailError == true ? addError(validation, "Запись не похожа на email", errorsList) : removeError(validation, errorsList)
    }, [isEmailError])

    useEffect( () => {
        const validation = 'isConfirm'
        isConfirmError == true ? addError(validation, "Записи не похожи", errorsList) : removeError(validation, errorsList)
    }, [isConfirmError])

    // если массив ошибок пуст, то форма валидна и наоборот

    useEffect( () =>{
        errorsList.length > 0? setInputValid(false) : setInputValid(true)
    }, [errorsList])

    return {
        isEmptyError,
        minLengthError,
        isEmailError,
        isConfirmError,
        inputValid,
        errorsList
    }
}

export default useValidation