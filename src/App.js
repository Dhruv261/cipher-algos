import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home/Home.component';
import Authentication from './views/Auth/Authentication.component';
import NewPassComp from './views/NewPass/NewPass.component'
// import Playlist from './views/Personal Playlist/PersonalPlaylist.component';
// import IDPlaylist from './views/Personal Playlist/ID playlist/IDPlaylist.component';

function App() {
  return (
    <Routes>
      <Route index={true} element={<Home />} />
      <Route path='/authentication' element={<Authentication />} />
      <Route path='/pass-creater' element={<NewPassComp />} />
      {/* <Route path={`/aplaylist/:id`} element={<IDPlaylist />} /> */}
    </Routes>
  );
}

export default App;
