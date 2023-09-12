import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app';
import '@/assets/style/tailwind.css';
import '@/assets/style/reset.css';
import '@/assets/style/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
