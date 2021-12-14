
import './App.css';
import {Routes, Route} from "react-router-dom";
import Calendar from './Components/Calendar';
import Raport from './Components/Raport';
import Userlist from './Components/Userlist';
import Menu from './Components/Menu';
import Traininglist from './Components/Traininglist';

function App() {

  //yhteiset funktiot 
  //kehityskohteet:
  //traininglistiin suora muokkaus?
  //kalenteriin suora muokkaus tai popupin avaus
  //csv fle näyimpi formatointi

  
  return (
<div className="App">
  {/* Top menu bar storing links and routes for navigating */}
  <Menu />

  {/* Components assigned to router paths for rendering */}
  <Routes>
        <Route path="/calendar"  element={<Calendar />}></Route>
        <Route path="/"  element={<Userlist />}></Route>
        <Route path="/raport"     element={<Raport   />}></Route>
        <Route path="/userlist"    element={<Userlist />}></Route>
        <Route path="/traininglist" element={<Traininglist />}></Route>
  </Routes>

  </div>
  );
}

export default App;
