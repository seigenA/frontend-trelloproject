import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App>
                    <RouterProvider router={router} />
                </App>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)