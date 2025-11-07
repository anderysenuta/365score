import { Theme } from '@radix-ui/themes';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <Theme panelBackground='translucent'>
    <App />
  </Theme>,
);
