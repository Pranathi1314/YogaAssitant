import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Homepage from './components/Homepage/Homepage';
import Blogs from './components/Blogs/Blogs';
import YogaDetection from './components/YogaDetection/YogaDetection';
import Mainpage from './components/Mainpage/Mainpage';
import PosePage from './components/PosePage/PosePage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/yogaDetection' element={<YogaDetection/>}/>
      <Route path='/' element={<Mainpage/>}/>
      <Route path='/poses' element={<PosePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
