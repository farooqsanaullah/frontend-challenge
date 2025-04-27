import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { RecoilRoot } from "recoil"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
);
