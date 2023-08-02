import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useCPDateTime } from '../../hooks'
import classes from './ControlPanelComp.module.scss'
import { switchStep } from '../../redux/globalSlice'

export default function ControlPanelComp() {
    const dateTime = useCPDateTime()
    const navigate = useNavigate()
    const timeSummary = <p>{dateTime ? dateTime : 'Выберите время'}</p>
    const backButton = <button onClick={() => {
        dispatch(switchStep(1))
        navigate('/enrollment')
    }}>Назад</button>
    const isEnrollmentPage = /enrollment/.test(window.location.href)
    const dispatch = useAppDispatch()

    function switchPage() {
        if (isEnrollmentPage) {
            navigate('/confirmation')
            dispatch(switchStep(2))
        }
        else {
            navigate('/registered')
            dispatch(switchStep(3))
        }
    }

    return (
        <div className={classes.Wrapper}>
            {isEnrollmentPage ? timeSummary : backButton}
            <button type="button" onClick={switchPage}>{isEnrollmentPage ? "Далее" : "Подтвердить"}</button>
        </div>
    )
}