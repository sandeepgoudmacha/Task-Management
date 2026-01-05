import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './redux/themeSlice';
import Dashboard from './components/Dashboard';
import { Moon, Sun, Layout, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-tr from-primary-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-primary-500/30"
              >
                <Hexagon className="text-white h-7 w-7" />
              </motion.div>
              <span className="font-black text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 logofont">
                TaskMaster
              </span>
            </div>

            <div className="flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => dispatch(toggleTheme())}
                className="p-3 rounded-xl bg-white/20 dark:bg-black/20 text-gray-800 dark:text-gray-100 backdrop-blur-md hover:bg-white/40 dark:hover:bg-black/40 transition-all shadow-sm border border-white/20"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-12">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
