import {useDispatch, useSelector} from "react-redux";
import {checkAuth, getDb, logout} from "../../redux/actions/authAction";
import {useEffect} from "react";
import {CardUser} from "../CardItem/CardUser";
import {Spinner} from "../Spinner/Spinner";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../Button/Button";
import styles from './UserList.module.scss'

export const UserList = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.auth.db)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getDb())
        dispatch(checkAuth())
    },[])

    if (isLoading) {
       return <Spinner />
    }

    if (!isAuth) {
        navigate('/')
    }

    return (
        <>
            <div className={styles.header}>
                <h3>Пользователи</h3>
                <Button onClick={() => dispatch(logout())}>Выйти</Button>
            </div>
            <div className={styles.title}>
                <span>id</span>
                <span>name</span>
                <span>email</span>
                <span>login</span>
            </div>
            {data.map(d =>
                <Link key={d.id} to={`/panel/${d.id}`}>
                    <CardUser
                        id={d.id}
                        name={d.name}
                        email={d.email}
                        login={d.login}
                    />
                </Link>
            )}
        </>
    )
}
