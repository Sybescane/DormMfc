import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useCPDateTime } from '../../hooks'
import classes from './ControlPanelComp.module.scss'
import { selectTime, setFaculty, switchStep } from '../../redux/globalSlice'
import axios from 'axios'
import { useState } from 'react'
import { ReactComponent as Spinner } from '../../assets/white_spinner.svg'
import { ReactComponent as BlueSpinner } from '../../assets/blue_spinner.svg'
import { requestErrorHandler } from '../../utils/requestErrorsHandler'

export default function ControlPanelComp() {
    const [dateTime, date, time] = useCPDateTime()
    const navigate = useNavigate()
    const isEnrollmentPage = /enrollment/.test(window.location.href)
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.globalSlice.userData.email)
    const token = useAppSelector(state => state.globalSlice.userData.token)
    const [isLoadingNekst, setIsLoadingNekst] = useState<boolean>(false)
    const [isLoadingBack, setIsLoadingBack] = useState<boolean>(false)

    const timeSummary = <p>{dateTime ? dateTime : 'Выберите время'}</p>
    const backButton = <button className={`DefaultButton_2 ${classes.BackButton}`} onClick={() => {
        setIsLoadingBack(true)
        axios.put('http://localhost:4200/free-time', {
            email
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setIsLoadingBack(false)
            console.log('free time succeeded', res)
            dispatch(switchStep(1))
            navigate('/enrollment')
        }).catch(err => {
            setIsLoadingBack(false)
            requestErrorHandler(err)
        })
    }}>{isLoadingBack ? <BlueSpinner /> : 'Назад'}</button>

    function switchPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setIsLoadingNekst(true)

        if (isEnrollmentPage) {
            const recordDatetime = `2023-08-${date}T${time}:00`
            axios.post('http://localhost:4200/take-time', {
                email,
                recordDatetime
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({ data }) => {
                setIsLoadingNekst(false)
                dispatch(setFaculty(data.faculty))
                navigate('/confirmation')
                dispatch(switchStep(2))
            }).catch(err => {
                setIsLoadingNekst(false)
                requestErrorHandler(err)
            })
        }
        else {
            axios.post('http://localhost:4200/confirm-mail', {
                email
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                setIsLoadingNekst(false)
                navigate('/registered')
                dispatch(switchStep(3))
            }).catch(err => {
                setIsLoadingNekst(false)
                requestErrorHandler(err)
            })
        }
    }

    return (
        <div className={classes.Wrapper}>
            {isEnrollmentPage ? timeSummary : backButton}
            <button type="button" onClick={(e) => switchPage(e)} className='DefaultButton_1' style={{
                width: isEnrollmentPage ? '104px' : '143px'
            }}>{isLoadingNekst ? <Spinner /> : isEnrollmentPage ? "Далее" : "Подтвердить"}</button>
        </div>
    )
}