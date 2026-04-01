
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/configStore.jsx'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'


const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "PLACEHOLDER_ID"}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
)
