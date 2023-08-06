import { useNavigate } from "react-router-dom";
import ControlPanelComp from "../../components/ControlPanel/ControlPanelComp";
import EnrollStepsComp from "../../components/EnrollStepsComp/EnrollStepsComp";
import HeaderEnrollComp from "../../components/HeaderEnrollComp/HeaderEnrollComp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideCalendar, showPopup } from "../../redux/globalSlice";
import classes from './PageWrapper.module.scss';
import { ReactNode, useRef, useEffect } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const isButtonsShow = /(registered|admin)/.test(window.location.href)
    const faculty = useAppSelector(state => state.globalSlice.userData.faculty)
    const email = useAppSelector(state => state.globalSlice.userData.email)
    const navigate = useNavigate()

    function wrapperClick(e: React.MouseEvent) {
        dispatch(hideCalendar())
        dispatch(showPopup({ event: e, isShow: false, type: 'checkInPopup' }))
        dispatch(showPopup({
            event: e,
            isShow: false,
            type: 'busyWarning'
        }))
    }

    useEffect(() => {
        if (/registered/.test(window.location.href)) {
            console.log('faculty', faculty)
            switch (faculty) {
                case 'INMIN':
                    wrapperRef.current?.classList.add(`${classes.INMIN}`)
                    break;
                case 'EKOTECH':
                    wrapperRef.current?.classList.add(`${classes.EKOKEK}`)
                    break
                case 'EUPP':
                    wrapperRef.current?.classList.add(`${classes.EUPP}`)
                    break;
                case 'IBO':
                    wrapperRef.current?.classList.add(`${classes.IBO}`)
                    break;
                case 'ITKN':
                    wrapperRef.current?.classList.add(`${classes.ITKN}`)
                    break
                case 'GORNIY':
                    wrapperRef.current?.classList.add(`${classes.GORNIY}`)
                    break
            }
        }
    }, [window.location.href])

    useEffect(() => {
        if (!email) {
            navigate("/")
        }
    }, [email])

    return (
        <div className={classes.Wrapper} onClick={(e) => wrapperClick(e)} ref={wrapperRef}>
            <HeaderEnrollComp />
            {!/admin/.test(window.location.href) && <EnrollStepsComp />}
            <main>{children}</main>
            {!isButtonsShow && <ControlPanelComp />}
        </div>
    )
}