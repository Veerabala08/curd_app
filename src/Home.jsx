import Login from "./pages/Login";
import App from "./App";
import { Route, Routes} from "react-router-dom";
// import { useAccordionButton } from "react-bootstrap";
import { useEffect, useState } from "react";

const Home = () => {

    const[token, setToken]=useState(false)

    if(token){
        sessionStorage.setItem('token',JSON.stringify(token))
    }
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data)
        }
    },[])
return(
    <>
    <Routes>
      <Route path={'/'} element={<Login setToken={setToken}/>} />
      {token ? <Route path={'/App'} element={<App token={token}/>} />: " "}
    </Routes>
    </>
)

}

export default Home;
