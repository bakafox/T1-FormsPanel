import type { UserData, UserResData } from '@entities/UserData/model/types'
import type { FormStatus } from '../model/types'

import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Checkbox, DatePicker, Divider, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import styles from './UserForm.module.css'

interface Props {
    getUserResData?: UserResData,
    setUserData: (ud: UserData) => void,
    setStatus: (s: FormStatus) => void,
}

interface FormUserData extends Omit<UserData, 'fullName'> {
    passwordConfirm: string,
}

const createUserData: (
    formUd: FormUserData,
    birthDateAsString?: boolean
) => UserData = (formUd) => {
    return {
        name: formUd.name,
        surName: formUd.surName,
        fullName: formUd.surName ? `${formUd.name} ${formUd.surName}` : undefined,
        birthDate: formUd.birthDate,
        employment: formUd.employment || '',
        telephone: formUd?.telephone?.toString(),
        email: formUd?.email,
        password: formUd?.password,
        userAgreement: formUd?.userAgreement,
    }
}

const UserForm: React.FC<Props> = ({ getUserResData, setUserData, setStatus }) => {
    const isUserEditMode: boolean = !!getUserResData

    return (
        <Form
            name="userForm"
            initialValues={{
                ...getUserResData,
                // Ant Design использует dayjs для парсинга дат:
                birthDate: getUserResData?.birthDate
                    ? dayjs(getUserResData?.birthDate)
                    : undefined,
            }}
            onFinish={(formUd: FormUserData) => {
                setUserData(
                    createUserData(formUd, isUserEditMode),
                ); setStatus('finished')
            }}
        >
            <section className={styles.rowSection}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Укажите имя' },
                    ]}
                >
                    <Input variant="filled" placeholder="Имя" maxLength={64} />
                </Form.Item>

                <Form.Item
                    name="surName"
                    rules={[
                        { required: true, message: 'Укажите фамилию' },
                    ]}
                >
                    <Input variant="filled" placeholder="Фамилия" maxLength={64} />
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

            {!isUserEditMode
                ? (
                        <>
                            <Divider></Divider>

                            <Form.Item
                                name="telephone"
                                rules={[
                                    { required: true, message: 'Вы забыли указать номер телефона' },
                                    () => ({
                                        validator(_, value) {
                                            // Регулярное выражение взято отсюда: https://regex101.com/library/Fii9zH
                                            // eslint-disable-next-line regexp/no-unused-capturing-group, regexp/no-useless-escape
                                            const phoneRegex = /^(8|\+7)([\s\(\-])?(\d{3})([\s\)\-])?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/

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
                                        validator(_, value) {
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
                                        validator: (_, value) => (
                                            value ? Promise.resolve() : Promise.reject(new Error('Вы не можете не согласиться…'))
                                        ),
                                    }),
                                ]}
                            >
                                <Checkbox>
                                    Подписаться на рассылку «Комсомольской правды» по голубиной почте
                                </Checkbox>
                            </Form.Item>
                        </>
                    )
                : (
                        <Form.Item
                            name="telephone"
                            rules={[
                                { required: true, message: 'Вы забыли указать номер телефона' },
                                () => ({
                                    validator(_, value) {
                                        // Регулярное выражение взято отсюда: https://regex101.com/library/Fii9zH
                                        // eslint-disable-next-line regexp/no-unused-capturing-group, regexp/no-useless-escape
                                        const phoneRegex = /^(\+7)([\s\(\-])?(8|9)(\d{2})([\s\)\-])?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/

                                        if (!value || phoneRegex.test(value)) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error('Укажите действительный номер телефона РФ (+7)'),
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input variant="filled" prefix={<PhoneOutlined />} placeholder=" Номер телефона для связи" />
                        </Form.Item>
                    )}

            <Form.Item>
                {!isUserEditMode
                    ? (
                            <section className={styles.rowSection}>
                                <Button block onClick={() => setStatus('cancelled')}>
                                    Отмена
                                </Button>
                                <Button block type="primary" htmlType="submit">
                                    Создать пользователя
                                </Button>
                            </section>
                        )
                    : (
                            <section className={styles.rowSection}>
                                <Button block danger onClick={() => setStatus('deleted')}>
                                    Удалить
                                </Button>
                                <Button block onClick={() => setStatus('cancelled')}>
                                    Отмена
                                </Button>
                                <Button block type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </section>
                        )}
            </Form.Item>
        </Form>
    )
}

export default UserForm
