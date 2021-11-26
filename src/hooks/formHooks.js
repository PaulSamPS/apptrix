import {useEffect, useState} from "react";

const useValidation = (value, validations) => {
    const [isEmpty,setEmpty] = useState(true)
    const [minLengthError,setMinLengthError] = useState(true)
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
            }
        }
    },[value])

    useEffect(() => {
        if (isEmpty || minLengthError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[isEmpty,minLengthError])

    return {
        isEmpty,
        minLengthError,
        formValid
    }
}

export const useInput = (initialValue,validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value,validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}