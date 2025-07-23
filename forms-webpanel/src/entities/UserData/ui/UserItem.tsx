import type { UserResData } from '../model/types'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'
import React from 'react'
import styles from './UserItem.module.css'

interface Props {
    ud: UserResData,
    onClicked: () => void,
}

const UserItem: React.FC<Props> = ({ ud, onClicked }) => {
    return (
        <Card
            hoverable
            className={styles['user-item']}
            size="small"
            tabIndex={0}
            onKeyDown={e => (e.code === 'Enter') ? onClicked() : ''}
            onClick={onClicked}
        >
            <div className={styles['user-item__inner']}>
                <Typography.Text strong>
                    { ud.fullName ? ud.fullName : ud.name }
                </Typography.Text>
                <Typography.Text>
                    <PhoneOutlined /> { ud.telephone || '(не указан)'}
                </Typography.Text>
                <Typography.Text>
                    <MailOutlined /> { ud.email || '(не указан)'}
                </Typography.Text>
            </div>
        </Card>
    )
}

export default UserItem
