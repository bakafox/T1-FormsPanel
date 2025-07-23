import type { AppDispatch } from '@app/store'
import { getUsers } from '@entities/UserData/model/slice'
import Layout from '@shared/ui/layout/Layout'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './PanelPage.module.css'

const PanelPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        // Автофетчим список юзеров, только когда мы на странице панели!
        dispatch(getUsers())
    }, [])

    return (
        <Layout>
            <main className={styles['panel-wrap']}>
                fgsfds
            </main>
        </Layout>
    )
}

export default PanelPage
