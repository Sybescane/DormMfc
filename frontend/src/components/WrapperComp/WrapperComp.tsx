import { ReactNode,useEffect,useRef } from "react";
import classes from './WrapperComp.module.scss';
import { useAppSelector } from "../../hooks";

export default function WrapperComp({children}:{children:ReactNode}){
const institute = useAppSelector(state=>state.globalSlice.userData.faculty)
const wrapperRef = useRef<HTMLDivElement>(null)
const isShowAddEnroll = useAppSelector(state=>state.globalSlice.serviceData.isShowAddEnroll.isShow)
const isRegisteredPage = /registered/.test(window.location.href)

useEffect(() => {
    if (isRegisteredPage) {
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

    return (
        <div  ref={wrapperRef} className={isRegisteredPage?`${classes.Wrapper}`:(isShowAddEnroll?`${classes.WrapperOverlay}`:'')}>
{children}
        </div>
    )
}