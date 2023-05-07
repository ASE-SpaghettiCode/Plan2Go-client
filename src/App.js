import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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



function App() {


    return (
        <div className="App">
            {/*StompSessionProvider : Once a user open the App, he will be connected via WS*/}
            <StompSessionProvider
                brokerURL={`ws://localhost:8081/websocket`}
                // debug={STOMP => console.log({STOMP})}
                onConnect={() => console.log({STOMP_CONNECT: 'TCP connection successfully established'})}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/landing" element={<Landing/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/users/:id" element={<Profile/>}/>
                        <Route path="/home" element={<HomeMap/>}/>
                        <Route exat path="/profile/editing/:id" element={<AccountEdition/>}/>
                        <Route path="/post-creation" element={<PostCreation/>} />
                        <Route path="/map" element={<HomeMap/>}/>
                        <Route exact path="/travel-note-creation"
                               element={<TravelNoteCreation readOnly={false} editMode={false} creationMode={true}/>}
                        />
                        <Route exact path="/travel-notes/:id"
                               element={<TravelNoteCreation readOnly={true} editMode={false} creationMode={false}/> }
                        />
                        <Route exact path="/travel-notes/edit/:id"
                               element={<TravelNoteCreation readOnly={false} editMode={true} creationMode={false}/>}
                        />
                        <Route exact path="/following/travel-notes/:id"
                               element={<FollowingTravelNotes/>}
                        />
                        <Route exact path="/following/posts/:id"
                               element={<FollowingPosts/>}
                        />
                        <Route exact path="/following/:id"
                               element={<FollowingList/>}
                        />
                        <Route exact path="/follower/:id"
                               element={<FollowerList/>}
                        />
                    </Routes>
                </BrowserRouter>
            </StompSessionProvider>
        </div>
    );
}

export default App;