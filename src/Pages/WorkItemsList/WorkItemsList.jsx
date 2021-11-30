import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWorkItems} from "../../redux/actions/projectAction";
import {Button} from "../../components/Button/Button";
import {Spinner} from "../../components/Spinner/Spinner";
import styles from './WorkItemsList.module.scss'

export const WorkItemsList = () => {
    const {projectId} = useParams()
    const dispatch = useDispatch()
    const items = useSelector(state => state.auth.workItems)
    const isLoading = useSelector(state => state.auth.isLoading)

    useEffect(() => {
        dispatch(getWorkItems(projectId))
    },[])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Рабочие элементы</div>
            <div className={styles.tableName}>
                <span>Id</span>
                <span>Tабель учёта рабочего времени</span>
            </div>
            {isLoading ? <Spinner/> : items <=0 ? <h1 className={styles.notFound}>Ничего не найдено</h1> :
                items.map(i =>
            <div key={i.id} className={styles.table}>
                <span>{i.id}</span>
                <Link to={`/project/${projectId}/${i.id}`}>
                    <Button className={styles.btn}>Timesheet</Button>
                </Link>
            </div>)}
            <Link to={`/projects`}>
                <Button className={styles.btnBack}>Назад</Button>
            </Link>
        </div>
    )
}