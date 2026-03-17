import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./state/store"
import AppRouter from "./router/AppRouter"
import { ToastContainer } from "react-toastify"


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
      </PersistGate>
    </Provider>
  )
}
export default App
