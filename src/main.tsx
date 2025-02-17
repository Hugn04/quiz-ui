import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <>
        <App></App>
    </>,
    // <StrictMode>
    //   <App />
    // </StrictMode>,
);
