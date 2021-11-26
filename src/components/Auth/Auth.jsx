import styles from './Auth.module.scss'
import {useEffect} from "react";
import {checkAuth, login} from "../../redux/actions/authAction";
import {Spinner} from "../Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import cn from 'classnames'
import {useInput} from "../../hooks/formHooks";

export const Auth = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoading)
    const authErr = useSelector(state => state.auth.authErr)

    const name = useInput('', {isEmpty: true, minLength: 3})
    const password = useInput('',{isEmpty: true, minLength: 5})

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    const submitHandler = (e) => {
        if (!name.formValid || !password.formValid) {
            e.preventDefault()
        } else {
            dispatch(login(name.value,password.value))
            e.preventDefault()
        }
    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <form className={styles.wrapper} onSubmit={(e) => submitHandler(e)}>
            <div className={styles.login}>
                <label htmlFor="username">Логин</label>
                {(name.isDirty && name.isEmpty) && <span className={styles.errLogin}>Введите логин</span>}
                <input
                    name='username'
                    type="text"
                    onChange={e => name.onChange(e)}
                    placeholder="Введите логин"
                    onBlur={e => name.onBlur(e)}
                    value={name.value}
                />
            </div>
            <div className={styles.password}>
                <label htmlFor="password">Пароль</label>
                {(password.isDirty && password.isEmpty) && <span className={styles.errPassword}>Введите пароль</span>}
                <input
                    name='password'
                    type="password"
                    onChange={e => password.onChange(e)}
                    placeholder="Введите пароль"
                    value={password.value}
                    onBlur={e => password.onBlur(e)}
                />
            </div>
            {authErr ? <span className={styles.errAuth}>Неверный логин или пароль</span> : ''}
            <button className={cn(styles.btn, {
                [styles.btnActive]: name.formValid && password.formValid
            })} disabled={!name.formValid || !password.formValid}>
                Войти
            </button>
        </form>
    )
}

