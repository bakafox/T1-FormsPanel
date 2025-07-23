import type { AppDispatch, RootState } from '@app/store'
import type { UserData, UserResData } from '@entities/UserData/model/types'
import { deleteUser, getUser, updateUser } from '@entities/UserData/model/slice'
import styles from '@shared/ui/FormPage.module.css'
import Layout from '@shared/ui/layout/Layout'
import UserForm from '@widgets/user-form/ui/UserForm'
import type { FormStatus } from '@widgets/user-form/model/types'

import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const UserEditPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [searchParams] = useSearchParams()

    const myUserData: UserResData = useSelector(
        (state: RootState) => state.users.myUser,
    )

    // Такой костыль нужен, потому что UserData и UserResData не всегда конвертируемы
    const [getUserData, setUserData] = useState<UserData>({} as UserData)
    const [getUserResData, setUserResData] = useState<UserResData>({} as UserResData)
    const [getStatus, setStatus] = useState<FormStatus>('pending')

    const userId = searchParams.get('uid') || ''

    useEffect(() => {
        setUserResData({} as UserResData)

        async function updateUserData(): Promise<void> {
            const res = await dispatch(getUser({ uid: userId }))

            if (res.meta.requestStatus === 'rejected') { navigate('/') }

            const ud = res.payload as UserResData

            setUserResData(ud)
        }

        if (!userId) { navigate('/') }

        updateUserData()
    }, [userId])

    useEffect(() => {
        async function checkUserUpdate(): Promise<void> {
            const res = await dispatch(updateUser({ uid: userId, ud: getUserData }))
            if (res.meta.requestStatus === 'rejected') {
                const err = res as { error: Error }
                alert('Ошибка обновления пользователя: \n' + err.error.message)

                setStatus('pending')
            }
            else {
                navigate('/')
            }
        }

        async function checkUserDeletion(): Promise<void> {
            if (myUserData.id === userId) {
                alert('Пожалуйста, не удаляйте самого себя!!! Этот мир прекраснее, когда в нём есть вы!')
                setStatus('pending')
            }
            else {
                const res = await dispatch(deleteUser({ uid: userId }))
                if (res.meta.requestStatus === 'rejected') {
                    const err = res as { error: Error }
                    alert('Ошибка удаления пользователя: \n' + err.error.message)
    
                    setStatus('pending')
                }
                else {
                    navigate('/')
                }
            }
        }

        if (getStatus === 'finished') {
            checkUserUpdate()
        }
        else if (getStatus === 'deleted') {
            checkUserDeletion()
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
                        Редактирование пользователя
                    </Typography.Title>
                </header>

                <Card className={styles['form-card']} style={{ maxWidth: '800px' }}>
                    {Object.keys(getUserResData).length
                        ? (
                            <UserForm
                                getUserResData={getUserResData}
                                setUserData={setUserData}
                                setStatus={setStatus}
                            />
                        )
                        : (
                            <Typography.Text italic>
                                Загрузка…<br /><br />
                            </Typography.Text>
                        )
                    }
                </Card>
            </main>
        </Layout>
    )
}

export default UserEditPage
