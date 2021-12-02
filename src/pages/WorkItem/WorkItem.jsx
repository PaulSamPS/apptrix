import {useDispatch, useSelector} from "react-redux";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {WorkItemCardPDF} from "../../components/WorkItemCardPDF/WorkItemCardPDF";
import {useEffect} from "react";
import {getWorkItem} from "../../redux/actions/projectAction";
import {Link, useParams} from "react-router-dom";
import {Button} from "../../components/Button/Button";
import {Spinner} from "../../components/Spinner/Spinner";
import styles from "./WorkItem.module.scss";

export const WorkItem = () => {
    const {projectId,timesheet} = useParams()
    const dispatch = useDispatch()
    const items = useSelector(state => state.auth.workItem)
    const isLoading = useSelector(state => state.auth.isLoading)

    useEffect(() => {
        dispatch(getWorkItem(projectId,timesheet))
    },[dispatch,projectId,timesheet])

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Tабель учёта рабочего времени</div>
            <div className={styles.tableName}>
                <span>Автор</span>
                <span>Затрачено времени</span>
            </div>
            {isLoading ? <Spinner/> :
                <div className={styles.table}>
                    <span>{items.author?.name}</span>
                    <span>{items.duration?.presentation}</span>
                </div>
            }
            <div className={styles.blockButtons}>
                <Link to={`/project/${projectId}`}>
                    <Button className={styles.btn}>Назад</Button>
                </Link>
                <PDFDownloadLink
                    document={<WorkItemCardPDF author={items.author?.name} duration={items.duration?.presentation}/>}
                    fileName="workItem.pdf"
                >
                    {({loading}) =>
                        loading ? "Загрузка..." : <Button>Скачать</Button>
                    }
                </PDFDownloadLink>
            </div>
        </div>
    )
}

