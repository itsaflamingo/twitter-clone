import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, screen, cleanup, waitFor, getByText, act } from '@testing-library/react';
import Dashboard from '../components/Dashboard/Dashboard';
import { renderWithProviders } from './test-utils';
import useAuth from '../components/Sign_In_Page/useAuth';
import userEvent from '@testing-library/user-event';
import { deleteUserFromDb } from '../components/retrieveFromCloud';

const user = { 
    displayName: 'Algae Mountain', 
    email: 'algae.mountain.988@example.com',
    personalInfo: {
        hasAccount: true,
        name: 'Algae Mountain',
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
const user2 = { 
    email: 'otter.algae@example.com',
    personalInfo: {
        hasAccount: true,
        name: 'Otter Algae',
        handle: 'otter',
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

const userTweet = {
    name: 'Otter Algae', 
    handle: 'otter',
    id: 'lcsa',
    image: '',
    likes: '0',
    retweets: '0',
    picture: '',
    retweet: [],
    spot: 0,
    text: 'hi',
    words: 0
}

const tweet2 = {
    name: 'Otter Algae', 
    handle: 'otter',
    id: 'lcsc',
    image: '',
    likes: '0',
    retweets: '0',
    picture: '',
    retweet: [],
    spot: 0,
    text: 'test',
    words: 0
}

jest.mock('../components/Sign_In_Page/signInFn');
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/dashboard"
    })
  }));

// jest.mock('../components/retrieveFromCloud', () => {
//     return {
//     ...jest.requireActual("../components/retrieveFromCloud"),
//     deleteUserFromDb: jest.fn().mockImplementation(() => Promise.resolve())}
// })

jest.mock('../components/Sign_In_Page/useAuth')

describe('Dashboard component', () => {
    it("should display all menu options", () => {
        
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                }
            }   
        });

        const home = screen.getAllByText('Home');
        const profile = screen.getByText('Profile');
        const signOut = screen.getByText('Sign Out');
        const deleteAccount = screen.getByText('Delete Account');

        expect(home.length).toBe(2);
        expect(home[0]).toBeInTheDocument();
        expect(home[1]).toBeInTheDocument();
        expect(profile).toBeInTheDocument();
        expect(signOut).toBeInTheDocument();
        expect(deleteAccount).toBeInTheDocument();
    })
    it("should display tweets", () => {

        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
                tweets: [userTweet]
            }   
        });

        const tweet = screen.getByText(userTweet.name);
        expect(tweet).toBeInTheDocument();
    })
    it("should display recommended users", () => {
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user, user2],
                user: {
                    user
                },
            }   
        });

        const name = screen.getByText('Otter Algae');
        expect(name).toBeInTheDocument();
    })
    it("when like button clicked, counter should be set to 1", () => {
        
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
                tweets: [userTweet]
            }   
        });

        const btn = screen.getByRole('img', {  name: /like-btn/i})
        fireEvent.click(btn);

        const counter = screen.getByLabelText('like counter').innerHTML;
        expect(parseInt(counter)).toBe(1);
    })
    it("retweet should pop up when retweet clicked, and retweet counter set to one", () => {
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
                tweets: [userTweet]
            }   
        });

        const btn = screen.getByRole('img', {  name: /retweet-btn/i});
        fireEvent.click(btn);

        const retweet = screen.getAllByRole('img', {  name: /retweet-btn/i});
        const likes = screen.getAllByLabelText('like counter');
        const popUp = screen.getByLabelText('retweet pop up');

        expect(retweet.length).toBe(2);
        expect(likes.length).toBe(2);
        expect(popUp).toBeInTheDocument();
    })
    it("when tweet created, should display tweet", async() => {
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
            }   
        });

        userEvent.type(screen.getByRole('textbox', {  name: /tweet input/i }), 'input test')

        expect(screen.getByRole('textbox', {  name: /tweet input/i })).toHaveValue('input test')

        const submit = screen.getByText('Tweet');
        fireEvent.click(submit);

        expect(await screen.findByText(user.displayName)).toBeInTheDocument();
    })
    it("should filter tweets based on search input", () => {
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
                tweets: [userTweet, tweet2]
            }   
        });

        const box = screen.getByRole('searchbox')
        userEvent.type(box, 'test')

        expect(box).toHaveValue('test');

        const searchBtn = screen.getByRole('img', {  name: /search/i})
        fireEvent.click(searchBtn);

        expect(screen.queryByText(userTweet.text)).toBeNull();
        expect(screen.getByText(tweet2.text)).toBeInTheDocument();
    })
    it("when tweet retweeted, should display retweet", async() => {
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
                tweets: [userTweet, tweet2]
            }   
        });

        // target retweet button
        const btn = screen.getAllByRole('img', {  name: /retweet-btn/i});
        // click retweet
        fireEvent.click(btn[0]);

        // target retweet textbox
        const retweetInput = screen.queryByLabelText('retweet-input');

        // type in retweet textbox
        userEvent.type(retweetInput, 'rt test');
        // confirm typing changes textbox content
        expect(retweetInput).toHaveValue('rt test');
        // target submit tweet button
        const submit = screen.queryByLabelText('submit-retweet');
        // click submit button
        fireEvent.click(submit);

        const rt = screen.getAllByText(userTweet.text);

        expect(screen.getByText('rt test')).toBeInTheDocument();
        expect(screen.getAllByText('rt test')).toHaveLength(1);
        expect(rt).toHaveLength(2);
    })
    it("when sign out clicked, switch to homepage", async() => {
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })

        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                },
                tweets: [userTweet]
            }   
        });

        const signOut = screen.getByText('Sign Out');

        act(() => {
            fireEvent.click(signOut);
        })

        await waitFor(() => expect(window.location.pathname).toEqual('/'))

    })
    it("when delete account clicked, deleteUserFromDb is called", async() => {
        jest.spyOn(await deleteUserFromDb());
        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })
        const users = [user];
        renderWithProviders ( <Dashboard />, {
            preloadedState: {
                users,
                user: {
                    user
                },
            }   
        });

        const deleteAccount = screen.getByText('Delete Account');
        fireEvent.click(deleteAccount);
        
        await waitFor(() => expect(window.location.pathname).toEqual('/'))
        await waitFor(() => expect(deleteUserFromDb).toHaveBeenCalled())
    })
    it.todo("visit profile page on profile button click")
})
