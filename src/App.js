import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import { ShowSignInPopupContext } from './components/contexts/signInPopupContext';
import { useState } from 'react';

function App() {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <ShowSignInPopupContext.Provider value={{ showPopup, setShowPopup }}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ShowSignInPopupContext.Provider>

  );
}

export default App;
