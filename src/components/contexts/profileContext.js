import React from 'react';

const ProfileContext = React.createContext();

const ProfileProvider = ProfileContext.Provider;
const ProfileConsumer = ProfileContext.Consumer;

export { ProfileContext, ProfileProvider, ProfileConsumer };