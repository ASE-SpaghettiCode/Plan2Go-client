import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import {Navigate} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Landing from "./components/landing/Landing";
import Login from "./components/login-register/Login";
import Register from "./components/login-register/Register";
import HomeMap from "./components/home/HomeMap";
import TravelNoteCreation from "./components/travel-note/TravelNoteCreation"
import AccountEdition from "./components/profile/AccountEdition";
import PostCreation from "./components/post/PostCreation";
import FollowingTravelNotes from "./components/following-subpages/FollowingTravelNotes";
import FollowingPosts from "./components/following-subpages/FollowingPosts";
import FollowingList from "./components/following-subpages/FollowingList";
import FollowerList from "./components/following-subpages/FollwerList";
import {StompSessionProvider} from "react-stomp-hooks";
import LoginGuard from "./components/Route/LoginGuard";
import HomeGuard from "./components/Route/HomeGuard";
import {ConfigProvider} from "antd";



function App() {

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Poppins',
                },
            }}
        >
        <div className="App">
            {/*StompSessionProvider : Once a user open the App, he will be connected via WS*/}
            <StompSessionProvider
                brokerURL={`ws://localhost:8081/websocket`}
                // debug={STOMP => console.log({STOMP})}
                onConnect={() => console.log({STOMP_CONNECT: 'TCP connection successfully established'})}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomeGuard><Navigate to="/landing"/></HomeGuard>}></Route>
                        <Route path="/landing" element={<HomeGuard><Landing/></HomeGuard>}/>
                        <Route path="/login" element={<HomeGuard><Login/></HomeGuard>}/>
                        <Route path="/register" element={<HomeGuard><Register/></HomeGuard>}/>
                        <Route path="/users/:id" element={<LoginGuard><Profile/></LoginGuard>}/>
                        <Route path="/home" element={<LoginGuard><HomeMap/></LoginGuard>}/>
                        <Route exat path="/profile/editing/:id" element={<LoginGuard><AccountEdition/></LoginGuard>}/>
                        <Route path="/post-creation" element={<LoginGuard><PostCreation/></LoginGuard>} />
                        <Route path="/map" element={<LoginGuard><HomeMap/></LoginGuard>}/>
                        <Route exact path="/travel-note-creation"
                               element={<LoginGuard><TravelNoteCreation readOnly={false} editMode={false} creationMode={true}/></LoginGuard>}
                        />
                        <Route exact path="/travel-notes/:id"
                               element={<LoginGuard><TravelNoteCreation readOnly={true} editMode={false} creationMode={false}/></LoginGuard> }
                        />
                        <Route exact path="/travel-notes/edit/:id"
                               element={<LoginGuard><TravelNoteCreation readOnly={false} editMode={true} creationMode={false}/></LoginGuard>}
                        />
                        <Route exact path="/following/travel-notes/:id"
                               element={<LoginGuard><FollowingTravelNotes/></LoginGuard>}
                        />
                        <Route exact path="/following/posts/:id"
                               element={<LoginGuard><FollowingPosts/></LoginGuard>}
                        />
                        <Route exact path="/following/:id"
                               element={<LoginGuard><FollowingList/></LoginGuard>}
                        />
                        <Route exact path="/follower/:id"
                               element={<LoginGuard><FollowerList/></LoginGuard>}
                        />
                    </Routes>
                </BrowserRouter>
            </StompSessionProvider>
        </div>
        </ConfigProvider>
    );
}

export default App;