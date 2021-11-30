import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CardUser} from "../../components/CardUser/CardUser";
import {Spinner} from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";
import {getUsers} from "../../redux/actions/usersAction";
import styles from './UserList.module.scss'

export const UserList = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.auth.users)
    const isLoading = useSelector(state => state.auth.isLoading)

    useEffect(() => {
        dispatch(getUsers())
    },[])

    return (
        <>
            <div className={styles.title}>Пользователи</div>
            <div className={styles.tableName}>
                <span>id</span>
                <span>name</span>
                <span>email</span>
                <span>login</span>
            </div>
            {isLoading ? <Spinner/> :
                data.map(d =>
                <Link key={d.id} to={`/user/${d.id}`}>
                    <CardUser
                        id={d.id}
                        name={d.name}
                        email={d.email}
                        login={d.login}
                    />
                </Link>)
            }
        </>
    )
}
