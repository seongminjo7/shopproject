import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Router from './router/Router';
import Header from './components/Header';
import GlobalStyle from './styles/GlobalStyle';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
        <Header />
        <main>
          <Outlet />
        </main>
      </AuthContextProvider>
    </>
  );
}

export default App;
