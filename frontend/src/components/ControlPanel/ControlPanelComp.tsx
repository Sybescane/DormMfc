import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useCPDateTime } from '../../hooks'
import classes from './ControlPanelComp.module.scss'
import { selectTime, switchStep } from '../../redux/globalSlice'
import axios from 'axios'
import { useState } from 'react'
import Spinner from '../../assets/white_spinner.svg'

export default function ControlPanelComp() {
    const [dateTime, date, time] = useCPDateTime()
    console.log('DATETIME', dateTime)
    const navigate = useNavigate()
    const isEnrollmentPage = /enrollment/.test(window.location.href)
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.globalSlice.userData.email)
    const token = useAppSelector(state => state.globalSlice.userData.token)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const timeSummary = <p>{dateTime ? dateTime : 'Выберите время'}</p>
    const backButton = <button className='DefaultButton_2' onClick={() => {
        dispatch(switchStep(1))
        navigate('/enrollment')
    }}>Назад</button>

    function switchPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (isEnrollmentPage) {
            navigate('/confirmation')
            dispatch(switchStep(2))
        }
        else {
            setIsLoading(true)
            const recordDatetime = `2023-08-${date}T${time}:00`
            axios.post('http://localhost:4200/user/take-time', {
                email,
                recordDatetime
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                if (err.response) {
                    console.log('Error', err.response)
                }
                else if (err.request) {
                    console.log(err.request)
                }
                else {
                    console.log('Error', err.message)
                }
            })
            navigate('/registered')
            dispatch(switchStep(3))
        }
    }

    return (
        <div className={classes.Wrapper}>
            {isEnrollmentPage ? timeSummary : backButton}
            <button type="button" onClick={(e) => switchPage(e)} className='DefaultButton_1'>{isLoading ? <Spinner /> : isEnrollmentPage ? "Далее" : "Подтвердить"}</button>
        </div>
    )
}