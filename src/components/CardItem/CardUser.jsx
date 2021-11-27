import styles from './CardUser.module.scss'

export const CardUser = (props) => {
    const {id,name,email,login} = props

    return (
       <>
               <div className={styles.block}>
                   <span>{id}</span>
                   <span>{login}</span>
                   <span>{name}</span>
                   <span>{email}</span>
               </div>
       </>
    )
}