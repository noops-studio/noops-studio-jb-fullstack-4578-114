import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import './App.css'
import LoginPage from '../layout/login/login'

export default function App(): JSX.Element {
    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Layout />} />
            </Routes>
            </BrowserRouter>
            
        </div>
    )
}