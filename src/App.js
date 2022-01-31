
import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Calendar from './Components/Calendar';
import Raport from './Components/Raport';
import Userlist from './Components/Userlist';
import Menu from './Components/Menu';
import Traininglist from './Components/Traininglist';
import { Snackbar } from '@material-ui/core';


function App() {
  
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  
  return (

  <div className="App">
  
    {/* Top menu bar storing links and routes for navigating */}
    <Menu />
    {/* Components assigned to router paths for rendering */}
    <Routes>
          <Route path="/calendar"  element={<Calendar setOpen={setOpen} setMsg={setMsg} />}></Route>
          <Route path="/"  element={<Userlist setOpen={setOpen} setMsg={setMsg} />}></Route>
          <Route path="/raport"     element={<Raport   />}></Route>
          <Route path="/userlist"    element={<Userlist setOpen={setOpen} setMsg={setMsg} />}></Route>
          <Route path="/traininglist" element={<Traininglist setOpen={setOpen} setMsg={setMsg}/>}></Route>
    </Routes>

    {/* Snackbar to display messages for user */}
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={msg}
    />

  </div>
  );
}

export default App;
