import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getProjects} from "../../redux/actions/projectAction";
import styles from './ProjectList.module.scss'

export const ProjectList = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.auth.projects)
    const [search,setSearch] = useState('')
    const [isOpen,setIsOpen] = useState(false)
    const autocompleteRef = useRef(null)

    useEffect(() => {
        dispatch(getProjects())
    },[])

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
    }, [isOpen])

    const filteredTasks = tasks.filter(tasks => {
        return search.length >= 3 ? tasks.project.name.toLowerCase().includes(search.toLowerCase()) : tasks
    })

    const itemClickHandler = (e) => {
        setSearch(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const inputClickHandler = () => {
        setIsOpen(true)
    }

    const handleOutsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(autocompleteRef.current)) {
            setIsOpen(false)
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()} ref={autocompleteRef}>
                <input
                    autoFocus
                    type="text"
                    placeholder='Поиск...'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    className={styles.searchInput}
                    onClick={inputClickHandler}
                />
                <ul className={styles.autocomplete}>
                    {
                        search && isOpen ?
                            filteredTasks.map(t =>
                                <li key={t.id} className={styles.item} onClick={itemClickHandler}>{t.project.name}</li>
                            ) : null
                    }
                </ul>
            </form>
            <div className={styles.title}>Задачи</div>
            <div className={styles.tableName}>
                <span>Id</span>
                <span>Задача</span>
                <span>Компания</span>
            </div>
            {filteredTasks.map(t =>
                <div key={t.id} className={styles.table}>
                    <span>{t.id}</span>
                    <span className={styles.summary}>{t.summary}</span>
                    <span>{t.project.name}</span>
                </div>
            )}
        </div>
    )
}