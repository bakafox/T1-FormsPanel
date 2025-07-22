import type { AppDispatch, RootState } from '@app/store'
import { getUsers } from '@entities/UserData/model/slice'
import Layout from '@shared/ui/layout/Layout'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './PanelPage.module.css'

const PanelPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
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
