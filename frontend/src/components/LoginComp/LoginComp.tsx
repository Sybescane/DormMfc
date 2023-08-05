import { useRef, useState } from 'react';
import classes from './LoginComp.module.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveUserBasics, saveUserData, showEmployeeLogin } from '../../redux/globalSlice';
import axios from 'axios';
import { ReactComponent as Spinner } from '../../assets/white_spinner.svg'

export default function LoginComp() {
    const navigate = useNavigate()
    const [isStudActive, setIsStudActive] = useState(false)
    const dispatch = useAppDispatch()
    const isEmployeeLogin = useAppSelector(state => state.globalSlice.serviceData.isEmployeeLogin)
    const [isCodeInput, setIsCodeInput] = useState(false)
    const [noEntry, setNoEntry] = useState(false)
    const [isActiveCode, setIsActiveCode] = useState(false)
    const userEmail = useRef('')
    const [isLoading, setIsLoading] = useState(false)

    function validateInputs(e: React.ChangeEvent<HTMLInputElement>) {
        if (/^m\d{7}(@edu\.misis\.ru)?$/.test(e.currentTarget.value)) {
            setIsStudActive(true)
        }
        else setIsStudActive(false)
    }

    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        e.preventDefault()
        if (!isStudActive || isLoading) return
        else {
            let email = (new FormData(e.currentTarget)).get('email') as string
            if (!/@/.test(email)) email += '@edu.misis.ru'
            axios.post('http://localhost:4200/auth/send-code', {
                email
            }).then(() => {
                setIsLoading(false)
                setIsCodeInput(true)
                userEmail.current = email
            }).catch(err => {
                setIsLoading(false)
                if (err.response) {
                    setIsCodeInput(false)
                    setNoEntry(true)
                }
                else if (err.request) {
                    console.log(err.request)
                }
                else {
                    console.log('Error', err.message)
                }
            })
        }
    }

    function sendCode(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        e.preventDefault()
        if (!isActiveCode || isLoading) return
        else {
            axios.post('http://localhost:4200/auth/login-user', {
                email: userEmail.current,
                code: (new FormData(e.currentTarget)).get('code')
            })
                .then(res => {
                    dispatch(saveUserBasics({
                        email: userEmail,
                        token: res.data.access_token
                    }))
                    axios.post('http://localhost:4200/start-recording', {
                        email: userEmail.current
                    }, {
                        headers: {
                            'Authorization': `Bearer ${res.data.access_token}`
                        }
                    }).then(res => {
                        console.log('response', res.data)
                        dispatch(saveUserData(res.data))
                        setIsLoading(false)
                        navigate('/enrollment')
                    }).catch(err => {
                        setIsLoading(false)
                        if (err.response) {
                            console.log('Response Error', err.response)
                        }
                        else if (err.request) {
                            console.log('Request Error', err.request)
                        }
                        else {
                            console.log('Request Config Error', err.message)
                        }
                    })
                }).catch(err => {
                    setIsLoading(false)
                    if (err.response) {
                        console.log(err.response)
                        console.log(err.response.status)
                    }
                    else if (err.request) {
                        console.log(err.request)
                    }
                    else {
                        console.log('Error', err.message)
                    }
                })
        }
    }

    return (
        <div className={classes.Wrapper}>
            <h1>Регистрация на заселение в общежитие</h1>
            <p className={classes.EmailInput}>Введите вашу корпоративную почту</p>
            <form className={classes.FormControls} onSubmit={(e) => { sendEmail(e) }}>
                <div className={classes.InputWrapper}>
                    <input type="text" placeholder='m2300000' name='email' required onChange={(e) => validateInputs(e)} />
                    <div className={classes.InputHint}><span>@edu.misis.ru</span></div>
                </div>
                {noEntry &&
                    <p className={classes.NoEntry}>Введенный адрес почты не найден. Проверьте и попробуйте снова или обратитесь в поддержку.</p>
                }
                {!isCodeInput &&
                    <button type="submit" className={isStudActive ? 'DefaultButton_1' : 'DisabledButton'}>{isLoading ? <Spinner /> : 'Отправить код на почту'}</button>
                }
            </form>
            {isCodeInput &&
                <form id='sendCode' className={classes.EnterCode} onSubmit={(e) => sendCode(e)}>
                    <label htmlFor="code">Введите код с почты</label>
                    <input type="password" name='code' id='code' required onChange={(e) => setIsActiveCode(/.+/.test(e.currentTarget.value))} />
                    <a>ОТПРАВИТЬ КОД СНОВА</a>
                    <button type="submit" className={isActiveCode ? 'DefaultButton_1' : 'DisabledButton'}>{isLoading ? <Spinner /> : 'Войти'}</button>
                </form>
            }
            {!isCodeInput &&
                <button type="button" className={`DefaultButton_2 ${classes.EmployeeBtn}`} onClick={(e) => dispatch(showEmployeeLogin())}>Войти как сотрудник</button>
            }
        </div>
    )
}