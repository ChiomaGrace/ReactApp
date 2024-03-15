import './App.css';
import Home from './Components/HomeComponent/Home'
import CreateResident from './Components/CreateComponent/CreateResident';
import AllResidents from './Components/ShowComponent/AllResidents'
import UpdateResident from './Components/UpdateComponent/UpdateResident';
import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="text-center">
              <Link to="/" className="btn btn-outline-secondary">Home</Link> 
              <Link to="/create" className="btn btn-outline-success">Create Residency</Link> 
              <Link to="/show" className="btn btn-outline-info">Bikini Bottom Residents</Link> 
              <Link to="/show" className="btn btn-outline-primary">Update Residency</Link>     
              <Link to="/show" className="btn btn-outline-danger">Delete Resident</Link> 
        </div>
      </nav>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create' element={<CreateResident/>}></Route>
            <Route path='/show/*' element={<AllResidents/>}></Route>
            <Route path='/update/:id' element={<UpdateResident/>}></Route>
        </Routes>
    </>
  );
}

export default App;
