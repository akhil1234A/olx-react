import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from './Context/Context.jsx'; // Use FirebaseProvider instead of direct context
import { ThemeProvider } from './Context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>  {/* Wrap in FirebaseProvider */}
      <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProvider>
    </FirebaseProvider>
  </StrictMode>
);
