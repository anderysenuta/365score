import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { UserContext } from '../../../contexts/UserContext';
import WelcomePage from '../WelcomePage';

describe('WelcomePage', () => {
  it('renders start button', () => {
    const mockSetSessionId = vi.fn();

    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            sessionId: null,
            setSessionId: mockSetSessionId,
            isLoading: false,
          }}
        >
          <WelcomePage />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    const startButton = screen.getByTestId('welcome-start-btn');

    expect(startButton).toBeInTheDocument();
  });
});
