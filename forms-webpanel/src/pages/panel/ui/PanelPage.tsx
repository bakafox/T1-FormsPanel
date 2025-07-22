import type { AppDispatch } from '@app/store'
import type { LoginData } from '@entities/LoginData/model/types'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './PanelPage.module.css'
import Layout from '@shared/ui/layout/Layout'

const PanelPage: React.FC = () => {
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
        <Layout>
            <main className={styles['panel-wrap']}>
                fgsfds
            </main>
        </Layout>
    )
}

export default PanelPage
