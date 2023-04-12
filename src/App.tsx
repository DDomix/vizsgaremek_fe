import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Car from "./modulok/car";
import Drivers from "./modulok/drivers";
import Login from "./modulok/Login";
import Logout from "./modulok/logout";
import MainSite from "./modulok/mainsite";
import Register from "./modulok/register";
import Shop from "./modulok/shop";


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
      <Route path="/car" element={<Car />}></Route>
      <Route path="/drivers" element={<Drivers />}></Route>
      <Route path="/shop" element={<Shop/>}></Route>
    </Routes></>
  );
}

export default App;
