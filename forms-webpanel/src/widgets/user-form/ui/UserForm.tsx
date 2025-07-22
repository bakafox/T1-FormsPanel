import type { UserData } from '@entities/UserData/model/types'
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Checkbox, DatePicker, Divider, Form, Input } from 'antd'
import React, { useState } from 'react'
import styles from './UserForm.module.css'

interface Props {
    getUserData: UserData,
    setUserData: (ud: UserData) => void,
}

interface FormUserData extends Omit<UserData, 'fullName'> {
    passwordConfirm: string,
}

const createUserData: (formUd: FormUserData) => UserData = (formUd) => {
    return {
        name: formUd.name,
        surName: formUd.surName,
        fullName: `${formUd.name} ${formUd.surName}`,
        birthDate: formUd.birthDate,
        employment: formUd.employment || '',
        telephone: formUd.telephone.toString(),
        email: formUd.email,
        password: formUd.password,
        userAgreement: true,
    }
}

const UserForm: React.FC<Props> = ({ getUserData, setUserData }) => {
    return (
        <Form
            name="userForm"
            initialValues={{ ...getUserData }}
            onFinish={(formUd: FormUserData) => setUserData(createUserData(formUd))}
        >
            <section className={styles.rowSection}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Укажите имя' },
                    ]}
                >
                    <Input variant="filled" placeholder="Имя" />
                </Form.Item>

                <Form.Item
                    name="surName"
                    rules={[
                        { required: true, message: 'Укажите фамилию' },
                    ]}
                >
                    <Input variant="filled" placeholder="Фамилия" />
                </Form.Item>
            </section>

            <Form.Item
                name="birthDate"
                rules={[
                    { required: true, message: 'Укажите дату рождения' },
                ]}
                label="Дата рождения"
            >
                <DatePicker variant="filled" placeholder="" />
            </Form.Item>

            <Form.Item
                name="employment"
            >
                <Input variant="filled" placeholder="Место работы (оставьте пустым, если не работаете)" />
            </Form.Item>

            <Divider></Divider>

            <Form.Item
                name="telephone"
                rules={[
                    { required: true, message: 'Вы забыли указать номер телефона' },
                    () => ({
                        validator(rule, value) {
                            // https://gist.github.com/fearrr/b38b5a63740657300c5e3e1816a762ac
                            const phoneRegex = /^((\+7)[\- ]?)?\(?\d{3}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/

                            if (!value || phoneRegex.test(value)) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error('Укажите действительный номер телефона РФ'),
                            )
                        },
                    }),
                ]}
            >
                <Input variant="filled" prefix={<PhoneOutlined />} placeholder=" Номер телефона для связи (+7)" />
            </Form.Item>

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
                    { required: true, message: 'Вы забыли указать пароль' },
                ]}
            >
                <Input.Password variant="filled" prefix={<LockOutlined />} placeholder=" Пароль" />
            </Form.Item>

            <Form.Item
                name="passwordConfirm"
                dependencies={[
                    'password',
                ]}
                rules={[
                    { required: true, message: 'Подтвердите пароль, введя его ещё раз' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error('Пароль и подтверждение пароля не совпадают!'),
                            )
                        },
                    }),
                ]}
            >
                <Input.Password variant="filled" prefix={<LockOutlined />} placeholder=" Подтверждение пароля" />
            </Form.Item>

            <Form.Item
                name="userAgreement"
                valuePropName="checked"
                rules={[
                    () => ({
                        validator: (rule, value) => (
                            value ? Promise.resolve() : Promise.reject(new Error('Вы не можете не согласиться…'))
                        ),
                    }),
                ]}
            >
                <Checkbox>
                    Пользователь подтверждает, что согласен на продажу <br />всех своих персональных данных за 3 копейки
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <section className={styles.rowSection}>
                    <Button block onClick={() => setUserData({ userAgreement: false } as UserData)}>
                        Отмена
                    </Button>
                    <Button block type="primary" htmlType="submit">
                        Создать пользователя
                    </Button>
                </section>
            </Form.Item>
        </Form>
    )
}

export default UserForm
