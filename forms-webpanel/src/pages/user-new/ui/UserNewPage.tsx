import type { AppDispatch } from '@app/store'
import type { UserData } from '@widgets/user-form/model/types'
import UserForm from '@widgets/user-form/ui/UserForm'

import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './UserNewPage.module.css'

const UserNewPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const [getUserData, setUserData] = useState<UserData>({} as UserData)

    useEffect(() => {
        if (getUserData.userAgreement) {
            console.log(getUserData)
            // dispatch(createTask({ task: getNewTask }))
            // navigate('/')
        }
        else if (getUserData.userAgreement === false) {
            console.log('cancelled')
            // dispatch(createTask({ task: getNewTask }))
            // navigate('/')
        }
    }, [getUserData])

    return (
        <main>
            <header className={styles.header}>
                <Typography.Title level={2}>Создание нового пользователя</Typography.Title>
            </header>

            <UserForm getUserData={getUserData} setUserData={setUserData} />
        </main>
    )
}

export default UserNewPage
