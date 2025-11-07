import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PublicRoute from './components/publicRoute';
import UserProvider from './contexts/UserContext';
import FinishPage from './pages/finish';
import QuestionPage from './pages/question';
import WelcomePage from './pages/welcome';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PublicRoute>
                <WelcomePage />
              </PublicRoute>
            }
          />
          <Route
            path='/questions'
            element={
              <ProtectedRoute>
                <QuestionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/finish'
            element={
              <ProtectedRoute>
                <FinishPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
