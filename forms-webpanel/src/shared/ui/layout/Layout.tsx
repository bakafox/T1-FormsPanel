import React from 'react'
import type { PropsWithChildren } from 'react'
import styles from './Layout.module.css'
import { Button, Layout, Typography } from 'antd'
import { LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const { Header, Content, Sider } = Layout

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate()

    return (
        <Layout style={{ backgroundColor: 'transparent' }}>
            <Header style={{ backgroundColor: 'transparent' }}>
                <Link to='/' className={styles.logo}>Панель управления пользователями</Link>
                <Button danger className={styles.logout} icon={<LogoutOutlined />}>
                    Выйти
                </Button>
            </Header>

            <Layout style={{ backgroundColor: 'transparent' }}>
                <Sider width={240} style={{ backgroundColor: 'transparent' }}>
                    <div className={styles['users-list']}>
                        <Typography.Text type='secondary'>
                            Всего пользователей: 000
                        </Typography.Text>

                        <Button type='dashed' icon={<PlusCircleOutlined />} onClick={() => navigate('/user/create')}>
                            Новый пользователь
                        </Button>
                    </div>
                </Sider>

                {children}
            </Layout>
        </Layout>
    )
}

export default PageLayout
