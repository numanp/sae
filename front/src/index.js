import React from 'react';
import ReactDom from 'react-dom';
import Main from './containers/Main.jsx'    
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {BrowserRouter,Route} from 'react-router-dom'    
import {Provider} from 'react-redux'
import store from './redux/store'


ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Route path='/' component={Main} />
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);