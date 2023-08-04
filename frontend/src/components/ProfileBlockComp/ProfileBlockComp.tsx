import { useAppSelector } from '../../hooks'
import classes from './ProfileBlockComp.module.scss'
import UserIconSVG from './assets/user_icon.svg'

export default function ProfileBlockComp() {
    const email = useAppSelector(state => state.globalSlice.userData.email)

    return (
        <div className={classes.Wrapper}>
            <img src={UserIconSVG} alt="user_icon" />
            <div className={classes.EmailExit}>
                <p>{email}</p>
                <a href="#">ВЫЙТИ</a>
            </div>
        </div>
    )
}