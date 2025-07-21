import type { AppDispatch } from '@app/store'
import type { LoginData } from '@widgets/login-form/model/types'
import LoginForm from '@widgets/login-form/ui/LoginForm'

import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './LoginPage.module.css'

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const [getLoginData, setLoginData] = useState<LoginData>({} as LoginData)

    useEffect(() => {
        if (getLoginData.email && getLoginData.password) {
            console.log(getLoginData)
            // dispatch(createTask({ task: getNewTask }))
            // navigate('/')
        }
    }, [getLoginData])

    return (
        <main>
            <header className={styles.header}>
                <Typography.Title level={2}>Вход в систему</Typography.Title>
            </header>

            <LoginForm getLoginData={getLoginData} setLoginData={setLoginData} />
        </main>
    )
}

export default LoginPage
