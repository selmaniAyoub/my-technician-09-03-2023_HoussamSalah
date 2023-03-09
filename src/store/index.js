import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { systemReducer } from './system/reducers';
import { getHomeTechniciansReducer } from './technicians-home-list/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    system: systemReducer,
    homeTechnicians: getHomeTechniciansReducer,
});

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewareEnhancer)
    );

    return store;
}

