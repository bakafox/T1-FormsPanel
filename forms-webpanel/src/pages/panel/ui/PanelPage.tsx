import type { AppDispatch, RootState } from '@app/store'
import type { UserResData } from '@entities/UserData/model/types'
import { getUsers } from '@entities/UserData/model/slice'
import Layout from '@shared/ui/layout/Layout'
import { Typography } from 'antd'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PanelPage.module.css'

const PanelPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const allUsersData: UserResData[] = useSelector(
        (state: RootState) => state.users.allUsers,
    )

    useEffect(() => {
        // Автофетчим список юзеров, только когда мы на странице панели!
        dispatch(getUsers())
    }, [])

    return (
        <Layout>
            <main className={styles['panel-wrap']}>
                <Typography.Title level={3}>
                    Таблица пользователей:
                </Typography.Title>

                <table className={styles['my-epic-table']}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Имя</th>
                            <th>E-mail</th>
                            <th>Телефон</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsersData.map((ud: UserResData) => (
                                <tr key={ud.id}>
                                    <td>{ud.id}</td>
                                    <td>{ud.fullName ? ud.fullName : ud.name}</td>
                                    <td>{ud.email}</td>
                                    <td>{ud.telephone}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </Layout>
    )
}

export default PanelPage
