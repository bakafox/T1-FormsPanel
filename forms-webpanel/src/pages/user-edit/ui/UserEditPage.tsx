import type { AppDispatch } from '@app/store'
import type { UserData } from '@entities/UserData/model/types'
import styles from '@shared/ui/FormPage.module.css'
import Layout from '@shared/ui/layout/Layout'
import UserForm from '@widgets/user-form/ui/UserForm'

import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const UserEditPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const [getUserData, setUserData] = useState<UserData>({} as UserData)

    useEffect(() => {
        if (!searchParams.get('uid')) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (getUserData.userAgreement) {
            console.log(getUserData)
            // dispatch(createTask({ task: getNewTask }))
            // navigate('/')
        }
        else if (getUserData.userAgreement === false) {
            console.log('cancelled')
            navigate('/')
        }
    }, [getUserData])

    return (
        <Layout>
            <main className={styles['form-wrap']}>
                <header className={styles.header}>
                    <Typography.Title level={2}>Редактирование пользователя</Typography.Title>
                </header>

                <Card className={styles['form-card']} style={{ maxWidth: '800px' }}>
                    <UserForm getUserData={getUserData} setUserData={setUserData} />
                </Card>
            </main>
        </Layout>
    )
}

export default UserEditPage
