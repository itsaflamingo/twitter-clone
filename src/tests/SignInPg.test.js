import React from 'react';
import '@testing-library/jest-dom'
import { render as rtlRender, fireEvent, waitFor, screen } from '@testing-library/react';
import SignInPg from '../components/Sign_In_Page/SignInPg';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';

const render = component => rtlRender(
    <Router>
        <Provider store={store}>
            {component}
            </Provider>
            </Router>
)
describe('SignInPg component', () => {

    test('should render sign in button', async () => {
        render (
            <SignInPg />
        );
   
        act(() => {
            const signInButton = screen.getByText('Sign In');
            expect(signInButton).toBeInTheDocument();
        })
        
    });

    // test('should call fetchUser action on sign in button click', async () => {
    //     render (
    //         <Router>
    //             <Provider store={store}>
    //                 <SignInPg />
    //             </Provider>
    //         </Router>
    //     );

    //     const signInButton = screen.getByText('Sign In');
    //     fireEvent.click(signInButton);

    //     const actions = store.getActions();
    //     expect(actions[0].type).toEqual('SignInPg/fetchUser');
    // });

    // test('should navigate to dashboard if user has an account', async () => {

    //     render (
    //         <Router>
    //             <Provider store={store}>
    //                 <SignInPg />
    //             </Provider>
    //         </Router>
    //     );

    //     const signInButton = screen.getByText('Sign In');
    //     fireEvent.click(signInButton);

    //     await waitFor(() => {
    //         expect(store.getActions()).toContainEqual({
    //             type: 'router/navigate',
    //             payload: '/dashboard',
    //         });
    //     });
    // });

    // test('should display edit profile info if user does not have an account', async () => {

    //     render (
    //         <Router>
    //             <Provider store={store}>
    //                 <SignInPg />
    //             </Provider>
    //         </Router>
    //     );

    //     const signInButton = screen.getByText('Sign In');
    //     fireEvent.click(signInButton);

    //     await waitFor(() => {
    //         expect(screen.getByTestId('edit-profile-info')).toBeInTheDocument();
    //     });
    // });
});