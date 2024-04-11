import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Navbar from './Components/Navbar';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';

function App() {
  console.log('app');
  return (
    <div className='App'>
    <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Homescreen />} />
          <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Loginscreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
