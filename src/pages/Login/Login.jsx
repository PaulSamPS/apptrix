import {login} from "../../redux/actions/authAction";
import {Spinner} from "../../components/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {useInput} from "../../hooks/formHooks";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/Button/Button";
import {useEffect} from "react";
import cn from 'classnames'
import styles from './Login.module.scss'

export const Login = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoading)
    const authErr = useSelector(state => state.auth.authErr)
    const navigate = useNavigate()

    const name = useInput('', {isEmpty: true, minLength: 3})
    const password = useInput('',{isEmpty: true, minLength: 5})
    const isAuth = localStorage.getItem("AccessToken")

    useEffect(() => {
        isAuth && navigate('/users', {replace: true})
    },[isAuth,navigate])

    const submitHandler = (e) => {
        if (!name.formValid || !password.formValid) {
            e.preventDefault()
        } else {
            dispatch(login(name.value,password.value))
        }
    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className={styles.wrapper}>
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
            <Button className={cn(styles.btn, {
                [styles.btnActive]: name.formValid && password.formValid
            })} disabled={!name.formValid || !password.formValid} onClick={e => submitHandler(e)}>
                Войти
            </Button>
        </div>
    )
}

