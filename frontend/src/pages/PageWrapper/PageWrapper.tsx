import { useNavigate } from "react-router-dom";
import ControlPanelComp from "../../components/ControlPanel/ControlPanelComp";
import EnrollStepsComp from "../../components/EnrollStepsComp/EnrollStepsComp";
import HeaderEnrollComp from "../../components/HeaderEnrollComp/HeaderEnrollComp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideCalendar, showNotify, showPopup } from "../../redux/globalSlice";
import classes from './PageWrapper.module.scss';
import { ReactNode, useRef, useEffect } from "react";
import AddEnrollComp from "../../components/AddEnrollComp/AddEnrollComp";
import NotifyComp from "../../components/NotifyComp/NotifyComp";
import NoOnlineComp from "../../components/NoOnlineComp/NoOnlineComp";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const isButtonsShow = /(registered|admin)/.test(window.location.href)
    const institute = useAppSelector(state => state.globalSlice.userData.faculty)
    const email = useAppSelector(state => state.globalSlice.userData.email)
    const adminToken = useAppSelector(state => state.adminSlice.token)
    const isShowAddEnroll = useAppSelector(state => state.globalSlice.serviceData.isShowAddEnroll.isShow)
    const isShowNotify = useAppSelector(state => state.globalSlice.serviceData.isShowNotify)
    const isOnline = useAppSelector(state=>state.globalSlice.serviceData.isOnline)

function wrapperClasses(isShowAddEnroll:boolean) {
    let classList = isShowAddEnroll ? `${classes.WrapperOverlay}` : `${classes.Wrapper}`
    classList = /admin/.test(window.location.href)? `${classList} ${classes.AdaptiveAdmin}`:classList
    return classList
}

    function wrapperClick(e: React.MouseEvent) {
        dispatch(hideCalendar())
        dispatch(showPopup({ event: e, isShow: false, type: 'checkInPopup' }))
        dispatch(showPopup({
            event: e,
            isShow: false,
            type: 'busyWarning'
        }))
        dispatch(showNotify({
            isShow: false,
            type: 'None',
            event: e
        }))
    }

    useEffect(() => {
        if (/registered/.test(window.location.href)) {
            switch (institute) {
                case 'ИНМИН':
                    wrapperRef.current?.classList.add(`${classes.INMIN}`)
                    break;
                case 'ЭКОТЕХ':
                    wrapperRef.current?.classList.add(`${classes.EKOKEK}`)
                    break
                case 'ЭУПП':
                    wrapperRef.current?.classList.add(`${classes.EUPP}`)
                    break;
                case 'ИБО':
                    wrapperRef.current?.classList.add(`${classes.IBO}`)
                    break;
                case 'ИТКН':
                    wrapperRef.current?.classList.add(`${classes.ITKN}`)
                    break
                case 'ГОРНЫЙ':
                    wrapperRef.current?.classList.add(`${classes.GORNIY}`)
                    break
            }
        }
    }, [window.location.href])

    useEffect(() => {
        if (!/admin/.test(window.location.href)) {
            if (!email) {
                navigate("/")
            }
        }
        else {
            if (!adminToken) {
                navigate('/')
            }
        }
    }, [email, adminToken])

    return (
        <div className={wrapperClasses(isShowAddEnroll)} onClick={(e) => wrapperClick(e)} ref={wrapperRef}>
            {!isOnline&&<NoOnlineComp/>}
            <HeaderEnrollComp />
            {!/admin/.test(window.location.href) && <EnrollStepsComp />}
            <main>{children}</main>
            {!isButtonsShow && <ControlPanelComp />}
            {isShowAddEnroll && <AddEnrollComp />}
            {isShowNotify.isShow && <NotifyComp type={isShowNotify.type} />}
        </div >
    )
}