import './index.css';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './state';
import { Application } from './containers';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <Provider store={createStore()}>
      <Application />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
