import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Bodywork from "./modulok/bodywork";
import Car from "./modulok/car";
import Driveability from "./modulok/driveability";
import Drivers from "./modulok/drivers";
import Engine from "./modulok/engine";
import Login from "./modulok/Login";
import Logout from "./modulok/logout";
import MainSite from "./modulok/mainsite";
import Register from "./modulok/register";
import Shop from "./modulok/shop";
import Cart from "./modulok/cart";


function App() {
  const [ authToken, setAuthToken ] = useState('');
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, [])

  if (loading) {
    return <p>'Loading...'</p>;
  }


  return (

    <><Logout authToken={authToken} onAuthTokenChange={setAuthToken} />
    
    
    <Routes>
      <Route path="/" element={<Login authToken={authToken} onAuthTokenChange={setAuthToken} />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/f1" element={<MainSite authToken={authToken} onAuthTokenChange={setAuthToken} />}></Route>
      <Route path="/*" element={<MainSite authToken={authToken} onAuthTokenChange={setAuthToken} />}></Route>
      <Route path="/car" element={<Car authToken={authToken} onAuthTokenChange={setAuthToken} />}></Route>
      <Route path="/engine" element={<Engine authToken={authToken} onAuthTokenChange={setAuthToken} />}></Route>
      <Route path="/bodywork" element={<Bodywork authToken={authToken} onAuthTokenChange={setAuthToken}/>}></Route>
      <Route path="/driveability" element={<Driveability authToken={authToken} onAuthTokenChange={setAuthToken}/>}></Route>
      <Route path="/drivers" element={<Drivers authToken={authToken} onAuthTokenChange={setAuthToken} />}></Route>
      <Route path="/shop" element={<Shop authToken={authToken} onAuthTokenChange={setAuthToken}/>}></Route>
      <Route path="/cart" element={<Cart updatedCart={[]}/>}></Route>
    </Routes></>
  );
}

export default App;
