import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import CreateRecipesScreen from './screens/CreateRecipesScreen.jsx'
import SavedRecipesScreen from './screens/SavedRecipesScreen.jsx'
import store from './store.js'
import ProfileScreen from './screens/ProfileScreen.jsx'
import YourRecipesScreen from './screens/YourRecipesScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/recipes/create" element={<CreateRecipesScreen />}></Route>
        <Route path="/recipes/saved" element={<SavedRecipesScreen />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/recipes" element={<YourRecipesScreen />}></Route>
      </Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
