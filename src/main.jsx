import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './config/store/store.js';
import { initAuthListener } from './modules/auth/authListener.js';
import ReactModal from 'react-modal';

import App from './App.jsx';
import './assets/i18n/index.js';
import './assets/css/common.scss';

initAuthListener(store);
ReactModal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
    // <StrictMode></StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
