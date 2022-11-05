import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPg from './components/SignInPg'
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<SignInPg />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
