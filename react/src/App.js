import { PrimeReactProvider } from 'primereact/api';
import Login from './login/Login';
import GiftList from './gifts/GiftList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './login/HomePage';
import Home from './Home';
import Donators from './Donators/Donators';
import AboutUs from './AboutUs';
import CustomFilterDemo from './login/searchby';
import Cart from './Cart/Cart';
import './App.css';
import './purchases/Purchases'
import Purchases from './purchases/Purchases';
import BuyAndPay from './buy&pay';
import DataViewDemo from './try';
import Register from './login/Register'

function App( Component, pageProps ) 
  {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Login/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/gifts/GiftList" element={<GiftList />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Donators" element={<Donators />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/searchGifts" element={<CustomFilterDemo/>}></Route>
          <Route path="/Purchases" element={<Purchases/>}></Route>
          <Route path="/buy&pay" element={<BuyAndPay/>}></Route>

          <Route path="/try" element={<DataViewDemo/>}></Route>


          {/* <Route path="/Manage Purchases" element={<Purchases/>}></Route> */}
        
        </ Routes>
    </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
