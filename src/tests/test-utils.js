import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { setupStore } from '../app/store'
import { ProfileProvider } from '../components/Profile/profileContext'
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

export function renderWithContextProviders(ui, {
    preloadedState = {},
    store = setupStore(preloadedState),
    providerProps = {},
    ...renderOptions
} = {}) {
    function Wrapper({children}) {
        return <Provider store={store}>
                    <ProfileProvider {...providerProps}>
                        <Router>
                            {children}
                            </Router>
                        </ProfileProvider>
                        </Provider>
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions })}
}