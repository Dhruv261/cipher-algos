import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home/Home.component';
import Authentication from './views/Auth/Authentication.component';
import NewPassComp from './views/NewPass/NewPass.component'

function App() {
  return (
    <Routes>
      <Route index={true} element={<Home />} />
      <Route path='/authentication' element={<Authentication />} />
      <Route path='/pass-creater' element={<NewPassComp />} />

    </Routes>
  );
}

export default App;
