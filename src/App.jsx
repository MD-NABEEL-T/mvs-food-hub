/*import { useState } from 'react';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="hero">
        <div class="logo">logo</div>
        <div class="menubar"></div>
    </div>

    <div class="container">
        <a href="Userlogin.html" class="user">
            <div class="user-left">
                <i class="fa-solid fa-user fa-2x"></i>
            </div>
            <div class="user-right">
                USER LOGIN
            </div>
        </a>

        <a href="Sellerlogin.html" class="seller">
            <div class="seller-left">
                <i class="fa-solid fa-store fa-2x"></i>
            </div>
            <div class="seller-right">
                SELLER LOGIN
            </div>
        </a>

        <a href="Deliverylogin.html" class="delivery">
            <div class="delivery-left">
                <i class="fa-solid fa-motorcycle fa-2x"></i>
            </div>
            <div class="delivery-right">
                DELIVERY LOGIN
            </div>
        </a>
    </div>
    </>
  )
}

export default App
*/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Test_home';
import CookProfile from './CookProfile';
import DishOverview from './DishOverview';
import CookHomepage from "./CookHomepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cook/:id" element={<CookProfile />} />
      <Route path="/dish/:id" element={<DishOverview />} />
      <Route path="/cook-home" element={<CookHomepage />} />

    </Routes>
  );
}

export default App;
