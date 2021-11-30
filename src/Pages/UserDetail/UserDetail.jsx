import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Spinner} from "../../components/Spinner/Spinner";
import {Button} from "../../components/Button/Button";
import {getUser} from "../../redux/actions/usersAction";
import styles from './UserDetail.module.scss'

export const UserDetail = () => {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const item = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.auth.isLoading)
    const {id,email,$type,name,login} = item

    useEffect(() => {
        dispatch(getUser(userId))
    },[])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className={styles.title}>
                <h2>Подробная карточка</h2>
            </div>
            <div className={styles.header}>
                <span>Информация о пользователе : </span>
                <h4>{login}</h4>
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
            <Link to={'/users'}>
                <Button>Назад</Button>
            </Link>
        </>
    )
}