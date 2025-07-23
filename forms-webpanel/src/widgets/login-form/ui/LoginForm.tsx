import type { LoginData } from '@entities/LoginData/model/types'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React from 'react'

interface Props {
    setLoginData: (ld: LoginData) => void,
}

const LoginForm: React.FC<Props> = ({ setLoginData }) => {
    return (
        <Form
            name="loginForm"
            onFinish={(ld: LoginData) => setLoginData(ld)}
        >
            <Form.Item
                name="email"
                rules={[
                    { type: 'email', message: 'Укажите действительный адрес электронной почты' },
                    { required: true, message: 'Вы забыли указать электронную почту' },
                ]}
            >
                <Input variant="filled" prefix={<MailOutlined />} placeholder=" Электронная почта" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Вы забыли указать ваш пароль' },
                ]}
            >
                <Input variant="filled" prefix={<LockOutlined />} type="password" placeholder=" Пароль" />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Войти!
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
