import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

const SESSION_KEY = 'session_id';

interface UserContextType {
  sessionId: string | null;
  setSessionId: (sessionId: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentSessionId, setcurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // check for existing session on mount
  useEffect(() => {
    const session_id = localStorage.getItem(SESSION_KEY);
    if (session_id) {
      setcurrentSessionId(session_id);
    }
    setIsLoading(false);
  }, []);

  const setSessionId = (value: string) => {
    if (!value) return;
    localStorage.setItem(SESSION_KEY, value);
    setcurrentSessionId(value);
  };

  return <UserContext.Provider value={{ sessionId: currentSessionId, setSessionId, isLoading }}>{children}</UserContext.Provider>;
};

const useSession = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useSession must be used within the UserProvider');
  }
  return context;
};

export { useSession, UserContext };
export default UserProvider;
