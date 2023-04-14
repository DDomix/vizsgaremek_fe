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
      <Route path="/engine" element={<Engine />}></Route>
      <Route path="/bodywork" element={<Bodywork />}></Route>
      <Route path="/driveability" element={<Driveability />}></Route>
      <Route path="/drivers" element={<Drivers />}></Route>
      <Route path="/shop" element={<Shop/>}></Route>
    </Routes></>
  );
}

export default App;
