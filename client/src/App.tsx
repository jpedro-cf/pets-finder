import { PersistAuth } from './components/PersistAuth'
import { Home } from './pages/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
export function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PersistAuth />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}
