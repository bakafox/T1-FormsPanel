import type { AppDispatch } from '@app/store'
import type { UserData } from '@entities/UserData/model/types'
import type { FormStatus } from '@widgets/user-form/model/types'
import { createUser } from '@entities/UserData/model/slice'
import styles from '@shared/ui/FormPage.module.css'
import Layout from '@shared/ui/layout/Layout'
import UserForm from '@widgets/user-form/ui/UserForm'

import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const UserNewPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const [getUserData, setUserData] = useState<UserData>({} as UserData)
    const [getStatus, setStatus] = useState<FormStatus>('pending')

    useEffect(() => {
        async function checkUserCreation(): Promise<void> {
            const res = await dispatch(createUser({ ud: getUserData }))
            if (res.meta.requestStatus === 'rejected') {
                const err = res as { error: Error }
                alert(`Ошибка создания пользователя: \n${err.error.message}`)

                setStatus('pending')
            }
            else {
                navigate('/')
            }
        }

        if (getStatus === 'finished') {
            checkUserCreation()
        }
        else if (getStatus === 'cancelled') {
            navigate('/')
        }
    }, [getStatus])

    return (
        <Layout>
            <main className={styles['form-wrap']}>
                <header className={styles.header}>
                    <Typography.Title level={2}>
                        Создание нового пользователя
                    </Typography.Title>
                </header>

                <Card className={styles['form-card']} style={{ maxWidth: '800px' }}>
                    <UserForm
                        setUserData={setUserData}
                        setStatus={setStatus}
                    />
                </Card>
            </main>
        </Layout>
    )
}

export default UserNewPage
