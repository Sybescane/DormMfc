import { useAppSelector } from '../../hooks'
import classes from './EnrollStepsComp.module.scss'

export default function EnrollStepsComp() {
    const enrollStep = useAppSelector(state => state.globalSlice.serviceData.enrollStep)
    console.log('enroll state')
    console.log(enrollStep)

    return (
        <div className={classes.Wrapper}>
            <div className={`${classes.Step1} ${classes.Step}`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" />
                    <path d="M22.996 25.008V26H17.572V25.008H19.844V18.16C19.7587 18.288 19.6093 18.4267 19.396 18.576C19.1933 18.7253 18.964 18.864 18.708 18.992C18.4627 19.12 18.2067 19.2267 17.94 19.312C17.6733 19.3973 17.4387 19.44 17.236 19.44V18.384C17.4813 18.384 17.748 18.3147 18.036 18.176C18.3347 18.0373 18.612 17.8773 18.868 17.696C19.1347 17.5147 19.3587 17.344 19.54 17.184C19.7213 17.024 19.8227 16.9173 19.844 16.864H20.964V25.008H22.996Z" fill={enrollStep !== 3 ? '#1D92F8' : '#000000'} />
                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke={enrollStep !== 3 ? '#1D92F8' : '#000000'} />
                </svg>
                <h6>Выбор времени</h6>
            </div>
            <div className={classes.Line1}></div>
            <div className={`${classes.Step2} ${classes.Step}`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" />
                    <path d="M16.204 26C16.204 25.6373 16.236 25.2747 16.3 24.912C16.364 24.5387 16.4867 24.1707 16.668 23.808C16.86 23.4453 17.1267 23.0987 17.468 22.768C17.82 22.4267 18.284 22.1067 18.86 21.808C19.1693 21.648 19.4893 21.4933 19.82 21.344C20.1613 21.184 20.4707 21.008 20.748 20.816C21.036 20.624 21.2707 20.4107 21.452 20.176C21.6333 19.9307 21.724 19.648 21.724 19.328C21.724 19.1253 21.676 18.928 21.58 18.736C21.4947 18.5333 21.3613 18.3573 21.18 18.208C21.0093 18.048 20.7907 17.92 20.524 17.824C20.268 17.728 19.964 17.68 19.612 17.68C19.26 17.68 18.9453 17.7333 18.668 17.84C18.3907 17.936 18.1453 18.0533 17.932 18.192C17.7293 18.3307 17.5533 18.48 17.404 18.64C17.2547 18.7893 17.1427 18.912 17.068 19.008L16.348 18.224C16.412 18.16 16.5347 18.0427 16.716 17.872C16.8973 17.7013 17.132 17.5307 17.42 17.36C17.7187 17.1893 18.0653 17.04 18.46 16.912C18.8547 16.7733 19.2973 16.704 19.788 16.704C20.2787 16.704 20.716 16.7733 21.1 16.912C21.484 17.04 21.8093 17.2213 22.076 17.456C22.3427 17.6907 22.5453 17.9627 22.684 18.272C22.8227 18.5707 22.892 18.8853 22.892 19.216C22.892 19.6533 22.796 20.032 22.604 20.352C22.412 20.672 22.172 20.9493 21.884 21.184C21.6067 21.4187 21.308 21.6213 20.988 21.792C20.668 21.952 20.38 22.0907 20.124 22.208C19.7827 22.3573 19.4467 22.528 19.116 22.72C18.796 22.9013 18.508 23.104 18.252 23.328C17.996 23.552 17.7827 23.8027 17.612 24.08C17.452 24.3573 17.372 24.6667 17.372 25.008H23.068V26H16.204Z" fill={enrollStep === 1 ? '#2C3E508F' : enrollStep === 2 ? '#1D92F8' : '#000000'} transform="translate(0.5,-1)" />
                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke={enrollStep === 1 ? '#2C3E501F' : enrollStep === 2 ? '#1D92F8' : '#000000'} />
                </svg>
                <h6>Подтверждение</h6>
            </div>
            <div className={classes.Line2}></div>
            <div className={`${classes.Step3} ${classes.Step}`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" />
                    <path d="M16 29V24M16 24L25.723 17.518C25.8067 17.4623 25.8751 17.3864 25.9219 17.2974C25.9686 17.2083 25.9923 17.1089 25.9906 17.0084C25.9889 16.9078 25.9619 16.8093 25.9122 16.7218C25.8625 16.6344 25.7916 16.5609 25.706 16.508L16.916 11.067C16.8251 11.0107 16.7209 10.9797 16.614 10.9772C16.5071 10.9747 16.4015 11.0008 16.3081 11.0528C16.2147 11.1048 16.1369 11.1808 16.0827 11.273C16.0286 11.3652 16 11.4701 16 11.577V24ZM16 19L22.5 14.524" stroke={enrollStep === 3 ? '#000000' : "#2C3E508F"} strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke={enrollStep === 3 ? '#000000' : "#2C3E501F"} />
                </svg>
            </div>
        </div>
    )
}