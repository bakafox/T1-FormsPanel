import React, { useState } from 'react'
import type { UserResData } from '../model/types'
import { Card, Typography } from 'antd'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import styles from './UserItem.module.css'

interface Props {
    ud: UserResData,
    onClicked: () => void
}

const UserItem: React.FC<Props> = ({ ud, onClicked }) => {
    return (
        <Card hoverable size='small' className={styles['user-item']} tabIndex={0}
            onKeyDown={(e) => (e.code === 'Enter') ? onClicked() : ''} onClick={onClicked}
        >
            <div className={styles['user-item__inner']}>
                <Typography.Text strong>
                    { ud.fullName ? ud.fullName : ud.name }
                </Typography.Text>
                <Typography.Text>
                    <PhoneOutlined /> { ud.telephone || '(не указан)'}
                </Typography.Text>
                <Typography.Text>
                    <MailOutlined /> { ud.email }
                </Typography.Text>
            </div>
        </Card>
    )
}

export default UserItem
