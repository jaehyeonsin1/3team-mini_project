import React, { useState } from "react";
import LoginMain from "./components/LoginMain";
import CalenderPage from "./components/CalendarPage";

function App(){
  const [isLoggedIn, setisLoggedIn] = useState(false);



  return ( // 로그인이 안되어 있으면 로그인 메인 로그인이 되어있다면 CalendarPage로 
    <div className="App"> 
    {!isLoggedIn ? (
       <LoginMain/>
    ) : (
       <div>
      <CalenderPage/>
      </div>
     )}
     </div>
   )
}
export default App;