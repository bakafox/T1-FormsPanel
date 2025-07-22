import type { AppDispatch } from '@app/store'
import { login } from '@entities/LoginData/model/slice'
import type { LoginData } from '@entities/LoginData/model/types'
import styles from '@shared/ui/FormPage.module.css'
import LoginForm from '@widgets/login-form/ui/LoginForm'

import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { redirect, useNavigate } from 'react-router'

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const [getLoginData, setLoginData] = useState<LoginData>({} as LoginData)

    useEffect(() => {
        async function doTheLogin() {
            const res = await dispatch(login({ ld: getLoginData }))
            if (res.meta.requestStatus !== 'rejected') { navigate('/') }
        }

        if (getLoginData.email && getLoginData.password) {
            doTheLogin()
        }
    }, [getLoginData])

    return (
        <main className={`${styles['form-wrap']} ${styles.centered}`}>
            <Card className={styles['form-card']} style={{ maxWidth: '600px' }}>
                <header className={styles.header}>
                    <Typography.Title level={1}>Вход в систему</Typography.Title>
                </header>

                <LoginForm getLoginData={getLoginData} setLoginData={setLoginData} />
            </Card>
        </main>
    )
}

export default LoginPage
