import type { AppDispatch, RootState } from '@app/store'
import type { UserResData } from '@entities/UserData/model/types'
import type { LoginMyData } from '@entities/LoginData/model/types'
import { getMyData, logout } from '@entities/LoginData/model/slice'
import { getUser, updateUser } from '@entities/UserData/model/slice'

import type { PropsWithChildren } from 'react'
import { LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Layout, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Layout.module.css'
import UserItem from '@entities/UserData/ui/UserItem'

const { Header, Sider } = Layout

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const allUsersData: UserResData[] = useSelector(
        (state: RootState) => state.users.allUsers,
    )
    const myUserData: UserResData = useSelector(
        (state: RootState) => state.users.myUser,
    )

    async function doTheLogout(): Promise<void> {
        await dispatch(logout())
        navigate('/login')
    }

    useEffect(() => {
        async function checkIfLoggedIn(): Promise<void> {
            const resLD = await dispatch(getMyData())
            if (resLD.meta.requestStatus === 'rejected') {
                return doTheLogout()
            }
            const loginData = resLD.payload as LoginMyData;
            
            if (!Object.keys(myUserData).length) {
                await dispatch(getUser({ uid: loginData.sub, setAsMyUser: true }))
            }
        }
        checkIfLoggedIn()
    }, [])

    return (
        <Layout style={{ backgroundColor: 'transparent' }}>
            <Header style={{ backgroundColor: 'transparent' }}>
                <Link to="/" className={styles.logo}>Панель управления пользователями</Link>
                <span>
                    { myUserData.fullName ? myUserData.fullName : myUserData.name }
                    &nbsp; &nbsp;
                    <Button danger className={styles.logout} icon={<LogoutOutlined />} onClick={async () => doTheLogout()}>
                        Выйти
                    </Button>
                </span>
            </Header>

            <Layout style={{ backgroundColor: 'transparent' }}>
                <Sider width={240} style={{ backgroundColor: 'transparent' }}>
                    <div className={`${styles['users-list']}
                        ${(allUsersData.length > 0) ? '' : styles.hidden}
                    `}>
                        <Button type="dashed" icon={<PlusCircleOutlined />} onClick={() => navigate('/user/create')}>
                            Новый пользователь
                        </Button>

                        <Typography.Text type="secondary">
                            Всего пользователей: {allUsersData.length}
                        </Typography.Text>

                        {allUsersData.map((ud: UserResData) => (
                            <UserItem ud={ud} onClicked={() => navigate(`/user/edit?uid=${ud.id}`)} />
                        )).reverse()}
                    </div>

                    <div className={`${styles['users-list']}
                        ${(allUsersData.length > 0) ? styles.hidden : ''}
                    `}>
                        <Typography.Text italic>Получение данных о пользователях, подождите…</Typography.Text>
                    </div>
                </Sider>

                {children}
            </Layout>
        </Layout>
    )
}

export default PageLayout
