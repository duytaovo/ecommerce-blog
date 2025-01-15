// i18n
import './i18n';

// scroll bar
// import 'simplebar/src/simplebar.css';

// highlight
import './utils/highlight';

// editor
import 'react-quill/dist/quill.snow.css';

// lightbox
import 'react-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// simplebar-react
import 'simplebar/dist/simplebar.min.css';

// react-phone-input-2
import 'react-phone-input-2/lib/material.css';
import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import store from './redux/store';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
//
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <BrowserRouter>
                <AuthProvider>
                  <OrderProvider>
                    <App />
                  </OrderProvider>
                </AuthProvider>
              </BrowserRouter>
            </SettingsProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </HelmetProvider>
  </React.StrictMode>
);
