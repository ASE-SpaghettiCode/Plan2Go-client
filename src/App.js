import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from "./components/Profile";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/landing" element={<Landing/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
