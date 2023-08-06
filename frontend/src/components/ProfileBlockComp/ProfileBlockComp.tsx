import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { cleanupStore } from '../../redux/globalSlice'
import classes from './ProfileBlockComp.module.scss'
import UserIconSVG from './assets/user_icon.svg'

export default function ProfileBlockComp() {
    const email = useAppSelector(state => state.globalSlice.userData.email)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function exit(e: React.MouseEvent) {
        e.preventDefault()
        dispatch(cleanupStore())
        navigate('/')
    }

    return (
        <div className={classes.Wrapper}>
            <img src={UserIconSVG} alt="user_icon" />
            <div className={classes.EmailExit}>
                <p>{email}</p>
                <a onClick={(e) => exit(e)}>ВЫЙТИ</a>
            </div>
        </div>
    )
}