import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChatPage } from './app/public/chat/ChatPage'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatPage />
  </StrictMode>,
)
