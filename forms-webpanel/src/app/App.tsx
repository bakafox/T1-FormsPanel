import LoginPage from '@pages/login/ui/LoginPage'
import PanelPage from '@pages/panel/ui/PanelPage'
import UserEditPage from '@pages/user-edit/ui/UserEditPage'
import UserNewPage from '@pages/user-new/ui/UserNewPage'

import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PanelPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/create" element={<UserNewPage />} />
            <Route path="/user/edit" element={<UserEditPage />} />
        </Routes>
    )
}

export default App
