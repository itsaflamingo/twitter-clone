import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import SignInPg from '../components/Sign_In_Page/SignInPg';
import { renderWithProviders } from './test-utils';
import { act } from "react-dom/test-utils";
import signIn from '../components/Sign_In_Page/signInFn';
import { getUsers } from '../components/retrieveFromCloud'


const loggedInUser = { 
    displayName: 'Algae Mountain', 
    email: 'algae.mountain.988@example.com',
    personalInfo: {
        hasAccount: true,
        profileInfo: {
            followers: [],
            following: [], 
            likes: 0,
            retweets: 0,
            profilePicture: '',
            coverPhoto: ''
            }
        }
    }

jest.mock('../components/Sign_In_Page/signInFn');
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/dashboard"
    })
  }));
jest.mock('../components/retrieveFromCloud', () => {
    const original = jest.requireActual('../components/retrieveFromCloud')
    return {
        ...original,
        getUsers: jest.fn().mockReturnValue([loggedInUser])
    }
})

const user = JSON.stringify({ 
    displayName: 'Elizabeth', 
    email: 'elizabeth.r.pinero@gmail.com',
    personalInfo: {
        name: 'userName',
        hasAccount: true,
        profileInfo: {
            followers: [],
            following: [], 
            likes: 0,
            coverPhoto: '',
            profilePicture: '',
        }
    }
})

describe('SignInPg component', () => {

    test('should render sign in button', () => {
        renderWithProviders (
            <SignInPg />
        );
   
        const signInButton = screen.getByText('Sign In');
        expect(signInButton).toBeInTheDocument();
        cleanup();
    });

    test('signIn should be called once when sign in button clicked', async () => {
        renderWithProviders (
            <SignInPg />
        );
        act(() => {
            signIn.mockReturnValue(user);
        })

        expect(signIn).toHaveBeenCalledTimes(0);
        
        const signInButton = screen.getByText('Sign In');
        fireEvent.click(signInButton);

        expect(signIn).toHaveBeenCalledTimes(1);
        cleanup();
    });

    test('should open sign up module if user does not have an account', async () => {

        renderWithProviders (
            <SignInPg />
        );
        
        act(() => {
            signIn.mockReturnValue(user);
        })

        const signInButton = screen.getByText('Sign In');
        fireEvent.click(signInButton);

        const fullName = await screen.findByText('Full Name');
        const description = await screen.findByText('Description');
        const profilePic = await screen.findByText('Add Profile Picture');
        const coverPhoto = await screen.findByText('Add Cover Photo');
        
        expect(fullName).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(profilePic).toBeInTheDocument();
        expect(coverPhoto).toBeInTheDocument();
        cleanup();

    });
    it('should visit dashboard page if user has an account', async () => {
        
        const users = await getUsers();

        renderWithProviders ( <SignInPg />, {
            preloadedState: {
                users
            }
        });

        act(() => {
            signIn.mockReturnValue(loggedInUser);
        })

        const signInButton = screen.getByText('Sign In');
        fireEvent.click(signInButton);

        const home = await screen.findByText('Home');
        const profile = await screen.findByText('Profile');
        const signOut = await screen.findByText('Sign Out');
        const deleteAccount = await screen.findByText('Delete Account');
        
        expect(home).toBeInTheDocument();
        expect(profile).toBeInTheDocument();
        expect(signOut).toBeInTheDocument();
        expect(deleteAccount).toBeInTheDocument();

        cleanup();
    })

    // test('should display edit profile info if user does not have an account', async () => {

    //     renderWithProviders (
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