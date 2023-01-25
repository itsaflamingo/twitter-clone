import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import usersReducer from '../components/Dashboard/allUsersSlice'
import { BrowserRouter as Router } from 'react-router-dom';
import { setupStore } from '../app/store'
// As a basic setup, import your same slice reducers

export function renderWithProviders(ui, {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
} = {}) {
    function Wrapper({children}) {
        return <Provider store={store}>
                <Router>
                    {children}
                    </Router>
            </Provider>
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions })}
}