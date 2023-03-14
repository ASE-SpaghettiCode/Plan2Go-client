import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from "./components/Profile";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/landing" element={<Landing/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
