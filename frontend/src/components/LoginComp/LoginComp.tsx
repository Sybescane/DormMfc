import { useEffect, useRef, useState } from 'react';
import classes from './LoginComp.module.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveUserBasics, showEmployeeLogin } from '../../redux/globalSlice';
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
    /*    function sendStudEmail() {
           if (isStudActive) {
               console.log('email')
               console.log(email)
               axios.post('http://localhost:4200/auth/send-code', {
                   email
               })
                   .then(data => {
                       if (data.status === 201) {
                           setIsCode(true)
                           dispatch(saveEmail(email))
                       }
                       else setNoEmail(true)
                   })
           }
       } */

    /*     function sendCode() {
            const data = {
                email,
                code
            }
            axios.post('http://localhost:4200/auth/login-user', data)
                .then(data => {
                    if (data.status === 200) {
                        dispatch(saveToken(data.data))
                        navigate('/enrollment')
                    }
                })
        } */

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
                        console.log(res.data)
                        setIsLoading(false)
                        navigate('/enrollment')
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
                <InputGroup className={`mb-3`}>
                    <Form.Control
                        className={isEmployeeLogin ? `${classes.InputStud}` : ''}
                        placeholder="m2300000"
                        aria-label="MISIS email"
                        aria-describedby="basic-addon2"
                        name='email'
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateInputs(e)}
                    />
                    <InputGroup.Text id="basic-addon2" className={isEmployeeLogin ? `${classes.InputClue} ${classes.InputStud}` : `${classes.InputClue}`}>@edu.misis.ru</InputGroup.Text>
                </InputGroup>
                {noEntry &&
                    <p className={classes.NoEntry}>Введенный адрес почты не найден. Проверьте и попробуйте снова или обратитесь в поддержку.</p>
                }
                {!isCodeInput &&
                    <button type="submit" className={isStudActive ? `${classes.ActiveStudent}` : `${classes.InactiveStudent}`} style={{ cursor: isLoading || !isStudActive ? 'auto' : 'pointer' }}>{isLoading ? <Spinner /> : 'Отправить код на почту'}</button>
                }
            </form>
            {isCodeInput &&
                <form id='sendCode' className={classes.EnterCode} onSubmit={(e) => sendCode(e)}>
                    <label htmlFor="code">Введите код с почты</label>
                    <input type="password" name='code' id='code' required onChange={(e) => setIsActiveCode(/.+/.test(e.currentTarget.value))} />
                    <a>Отправить код снова</a>
                    <button type="submit" style={{ cursor: isLoading || !isActiveCode ? 'auto' : 'pointer' }} className={isActiveCode ? `${classes.EmployeeBtn} ${classes.ActiveStudent}` : `${classes.EmployeeBtn}`}>{isLoading ? <Spinner /> : 'Войти'}</button>
                </form>
            }
            {!isCodeInput &&
                <button type="button" className={classes.EmployeeBtn} onClick={(e) => dispatch(showEmployeeLogin())}>Войти как сотрудник</button>
            }
        </div>
    )
}