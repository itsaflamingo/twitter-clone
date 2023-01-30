import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor, act } from '@testing-library/react';
import Profile from '../components/Profile/Profile';
import { renderWithProviders, renderWithContextProviders } from './test-utils';
import useAuth from '../components/Sign_In_Page/useAuth';
import userEvent from '@testing-library/user-event';
import * as retrieveFromCloud from '../components/retrieveFromCloud';
import { current } from '@reduxjs/toolkit';
import { useLocation } from 'react-router-dom';

const user = { 
    displayName: 'Algae Mountain', 
    email: 'algae.mountain.988@example.com',
    personalInfo: {
        hasAccount: true,
        name: 'Algae Mountain',
        handle: 'algae',
        description: 'hi',
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
        description: 'description',
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
    name: 'Algae Mountain', 
    handle: 'algae',
    id: 'lcsa',
    image: '',
    likes: '0',
    retweets: '0',
    picture: '',
    retweet: [],
    spot: 0,
    text: 'algae tweet',
    words: 0
}

const user2Tweet = {
    name: 'Otter Algae', 
    handle: 'otter',
    id: 'lcsc',
    image: '',
    likes: '0',
    retweets: '0',
    picture: '',
    retweet: [],
    spot: 0,
    text: 'otter tweet',
    words: 0
}
jest.mock('../components/Sign_In_Page/signInFn');
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn()
  }));

jest.mock('../components/Sign_In_Page/useAuth')
const userFn = jest.fn()

describe('Profile component', () => {

    beforeEach(() => {
        useLocation.mockReturnValue({
            state: 'Algae Mountain'
          })

        useAuth.mockReturnValue({ isSignedIn: true, signedInUser: user })
    })
    it('logged in user profile renders correctly', () => {

        renderWithContextProviders ( <Profile />, {
            preloadedState: {
                users: [user],
                user: {
                    user
                }
            },
            providerProps: {
                value: {user, userFn}
            }   
        });

        const name = screen.getByText(user.personalInfo.name);
        const handle = screen.getByText(`@${user.personalInfo.handle}`);
        const toggleButton = screen.getByText('Edit profile');
        const followers = screen.getByText('Followers');
        const following = screen.getByText('Following');

        expect(name).toBeInTheDocument();
        expect(handle).toBeInTheDocument();
        expect(toggleButton).toBeInTheDocument();
        expect(followers).toBeInTheDocument();
        expect(following).toBeInTheDocument();
    })
    it('non-logged in user profile renders correctly', () => {
        useLocation.mockReturnValue({ state: 'Otter Algae' });

        renderWithContextProviders ( <Profile />, {
            preloadedState: {
                users: [user, user2],
                user: { user },
                tweets: [user2Tweet, user],
                userTweets: [user2Tweet],
            },
            providerProps: {
                value: { user2, userFn }
            }   
        });

        const name = screen.getAllByText(user2.personalInfo.name);
        const handle = screen.getAllByText(`@${user2.personalInfo.handle}`);
        const toggleButton = screen.getAllByText('Follow');
        const followers = screen.getByText('Followers');
        const following = screen.getByText('Following');
        const otterTweet = screen.getByText('otter tweet');

        // shows user tweet
        expect(otterTweet).toBeInTheDocument();
        // one for profile heading, recommended user(since this user is not logged in) and one tweet
        expect(name.length).toBe(3);
        // handles present in profile user info, tweet 
        expect(handle.length).toBe(2);
        // one in user profile, the other in recommended users
        expect(toggleButton.length).toBe(2);
        expect(followers).toBeInTheDocument();
        expect(following).toBeInTheDocument();
    })
    it('can toggle edit profile as logged in user, opening and closing modal', () => {
        
        renderWithContextProviders ( <Profile />, {
            preloadedState: {
                users: [user, user2],
                user: { user },
                tweets: [user2Tweet, user],
                userTweets: [user2Tweet],
            },
            providerProps: {
                value: { user, userFn }
            }   
        });

        const editProfile = screen.getByText('Edit profile');
        fireEvent.click(editProfile);

        const name = screen.getByText('Full Name');
        const handle = screen.getByText('Handle');
        const description = screen.getByText('Description');
        const profilePic = screen.getByText('Add Profile Picture');
        const coverPic = screen.getByText('Add Cover Photo');

        expect(name).toBeInTheDocument();
        expect(handle).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(profilePic).toBeInTheDocument();
        expect(coverPic).toBeInTheDocument();
    })
    it('if edit profile clicked twice, modal closes', () => {

        renderWithContextProviders ( <Profile />, {
            preloadedState: {
                users: [user, user2],
                user: { user },
                tweets: [user2Tweet, user],
                userTweets: [user2Tweet],
            },
            providerProps: {
                value: { user, userFn }
            }   
        });

        const editProfile = screen.getByText('Edit profile');
        fireEvent.click(editProfile);
        fireEvent.click(editProfile);

        const name = screen.queryByText('Full Name');
        const handle = screen.queryByText('Handle');
        const description = screen.queryByText('Description');
        const profilePic = screen.queryByText('Add Profile Picture');
        const coverPic = screen.queryByText('Add Cover Photo');

        expect(name).toBeNull();
        expect(handle).toBeNull();
        expect(description).toBeNull();
        expect(profilePic).toBeNull();
        expect(coverPic).toBeNull();
    })
    it.todo('when profile information is edited, profile reflects that change')
    it('when follow button clicked once, followers increase by 1. If clicked again, follower count goes back to previous number', () => {

        useLocation.mockReturnValue({ state: 'Otter Algae' });

        renderWithContextProviders ( <Profile />, {
            preloadedState: {
                users: [user, user2],
                user: { user },
                tweets: [user2Tweet, user],
                userTweets: [user2Tweet],
            },
            providerProps: {
                value: { user2, userFn }
            }   
        });

        const follow = screen.getAllByText('Follow');
        fireEvent.click(follow[0]);

        const followerCount = screen.queryByText('1');

        expect(followerCount).toBeInTheDocument();

        fireEvent.click(follow[0]);
        expect(followerCount.innerHTML).toBe('0 ');
    })
    it('when home button clicked, can visit dashboard', () => {
        renderWithContextProviders ( <Profile />, {
            preloadedState: {
                users: [user, user2],
                user: { user },
                tweets: [user2Tweet, user],
                userTweets: [user2Tweet],
            },
            providerProps: {
                value: { user, userFn }
            }   
        });

        const home = screen.getByText('Home');
        fireEvent.click(home);

        expect(window.location.pathname).toEqual('/dashboard');
    })
})