export interface LoginData {
    email: string,
    password: string,
}

export interface LoginResData {
    message?: string,
}

export interface LoginMyData {
    sub: string,
    email: string,
    iat: number,
    exp: number,
}
