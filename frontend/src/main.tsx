import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './store/ThemeContext.tsx'
import './index.css'
import { NotesProvider } from './store/NotesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </ThemeProvider>
  </StrictMode>,
)
