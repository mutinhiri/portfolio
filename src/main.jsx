import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'

// Mount React — the #root static HTML (for crawlers) gets replaced here
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);