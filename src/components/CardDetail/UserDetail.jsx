import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Spinner} from "../Spinner/Spinner";
import {checkAuth, getItem, logout} from "../../redux/actions/authAction";
import {Button} from "../Button/Button";
import styles from './UserDetail.module.scss'

export const UserDetail = () => {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const item = useSelector(state => state.auth.item)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const {id,email,$type,name,login} = item

    useEffect(() => {
        dispatch(checkAuth())
        dispatch(getItem(userId))
    },[userId])

    if (isLoading) {
        return <Spinner />
    }

    if (!isAuth) {
        navigate('/')
    }

    return (
        <>
            <div className={styles.header}>
                <span>Информация о пользователе: </span>
                <h3>{login}</h3>
                <Button onClick={() => dispatch(logout())}>Выйти</Button>
            </div>
            <div className={styles.grid}>
                <div className={styles.block}>
                    <p>id</p>
                    <p>login</p>
                    <p>name</p>
                    <p>email</p>
                    <p>type</p>
                </div>
                <div className={styles.data}>
                    <span>{id}</span>
                    <span>{login}</span>
                    <span>{name}</span>
                    <span>{email}</span>
                    <span>{$type}</span>
                </div>
            </div>
            <Link to={'/panel'}>
                <Button>Назад</Button>
            </Link>
        </>
    )
}