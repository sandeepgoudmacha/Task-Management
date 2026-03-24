import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { toggleTheme } from './redux/themeSlice';
import { logout, clearAuthError } from './redux/authSlice';
import { resetTasksState } from './redux/tasksSlice';
import Dashboard from './components/Dashboard';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Moon, Sun, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
    const { theme } = useSelector((state) => state.theme);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Reset tasks state on logout
    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(resetTasksState());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <BrowserRouter>
            <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
                {/* Navbar */}
                <nav className="fixed w-full z-50 transition-all duration-300 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-gradient-to-tr from-primary-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-primary-500/30"
                                >
                                    <Hexagon className="text-white h-6 w-6" />
                                </motion.div>
                                <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400">
                                    TaskMaster
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => dispatch(toggleTheme())}
                                    className="p-2.5 rounded-xl bg-white/20 dark:bg-black/20 text-gray-800 dark:text-gray-100 backdrop-blur-md hover:bg-white/40 dark:hover:bg-black/40 transition-all shadow-sm border border-white/20"
                                    aria-label="Toggle Theme"
                                >
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="pt-24 pb-12">
                    <Routes>
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
                        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
