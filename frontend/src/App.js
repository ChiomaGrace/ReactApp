import './App.css';
import Home from './Components/HomeComponent/Home'
import CreateResident from './Components/CreateComponent/CreateResident';
import AllResidents from './Components/ShowComponent/AllResidents'
import UpdateResident from './Components/UpdateComponent/UpdateResident';
import DeleteResident from './Components/DeleteComponent/DeleteResident';
import { Link, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="text-center">
              <Link className="btn btn-outline-secondary" to="/">Home</Link> 
              <Link className="btn btn-outline-success" to="/create">Create Residency</Link> 
              <Link className="btn btn-outline-info" to="/show">Bikini Bottom Residents</Link> 
              <Link className="btn btn-outline-primary" to="/update">Update Residency</Link>     
              <Link className="btn btn-outline-danger" to="/delete">Delete Resident</Link> 
        </div>
      </nav>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create' element={<CreateResident/>}></Route>
            <Route path='/show' element={<AllResidents/>}></Route>
            <Route path='/update' element={<UpdateResident/>}></Route>
            <Route path='/delete' element={<DeleteResident/>}></Route>
        </Routes>
    </>
  );
}

export default App;
