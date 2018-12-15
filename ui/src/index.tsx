import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { MemoryUsageChart } from './components';
import { store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <MemoryUsageChart />
    </Provider>, 
    document.getElementById('root'),
);

