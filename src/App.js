import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPg from './components/Sign_In_Page/SignInPg'
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<SignInPg />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
