import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store,jhfawesgd} from './Store/store'
  import {Provider} from 'react-redux'
  // import {store} from './Store/store'
  import { PersistGate } from 'redux-persist/integration/react';
 
import { SocketProvider } from './contex/socketProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={jhfawesgd}>
    <SocketProvider>

        <App />
    </SocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


