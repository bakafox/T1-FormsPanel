export interface UserData {
    name: string,
    surName?: string,
    fullName?: string,
    birthDate: Date,
    employment?: string,
    email: string,
    telephone: string,
    password: string,
    userAgreement: boolean,
}

export interface UserResData extends Omit<
    UserData,
    'password' | 'birthDate' | 'telephone' | 'userAgreement'
> {
    id: string,
    birthDate?: string,
    telephone?: string,
    userAgreement?: boolean,
}

export interface UserCreatedData extends Pick<UserData, 'name'> {
    id: string,
}
