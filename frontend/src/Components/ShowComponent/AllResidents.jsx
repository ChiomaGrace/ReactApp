import React, {useState, useEffect} from 'react' //useState is a hook that allows the programmer to track a state in a functional component. It returns an array with two values: the current state and a function to update it. useEffect is a hook that allows the programmer to fetch data and update the DOM
import axios from "axios"; //a promised bassed HTTP library that makes API requests to the backend
import { Link, Routes, Route } from "react-router-dom";
import styles from "./AllResidents.module.css"
import UpdateResident from '../UpdateComponent/UpdateResident';

function Census() {
    const [residents, setResidents] = useState([]);
    useEffect( () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/residents`)
        .then((response) => {
            console.log("Residents:", response.data);
            setResidents(response.data);
        })
        .catch(error => console.log(error))
    }, []);

    function deleteResidency(event) {
        console.log("The deleteResidency button was clicked.", event);
        const id = event.currentTarget.getAttribute("data-value");
        console.log("Resident id:", id);
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteResident/${id}`)
        .then(() => {
            console.log("The resident has been deleted");
            const updateResidents = residents.filter(resident => resident._id !== id) //This will return everything but the deleted resident
            // console.log("Updated Resident List:", updateResidents);
            setResidents(updateResidents); //updating the useState so the deleted resident is no longer in the data
        })
        .catch(error => console.log(error))
    };

    return(
        <>
            <div className="container">
                <h1 className='text-center'>Residents</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Profile Picture</th>
                        <th scope="col">Occupation</th>
                        <th scope="col">Address</th>
                        <th scope="col">Edit Resident</th>

                        </tr>
                    </thead>
                    {residents.map((resident, index) => (
                        <tbody key={resident._id}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{resident.firstName} {resident.lastName}</td>
                                <td>
                                    <div className={styles.card}>
                                        <img className={styles.cardImage} src={resident.profilePicture} alt={`${resident.firstName} ${resident.lastName} from the 1999 Nickeloden Telvision Show Spongebob SquarePants`}/>
                                        <p className={styles.cardText}> Sex: {resident.physicalFeatures.sex}</p>
                                        <p className={styles.cardText}> Eye Color: {resident.physicalFeatures.eyeColor}</p>
                                        <p className={styles.cardText}> Hair Color: {resident.physicalFeatures.hairColor}</p>
                                    </div>
                                </td>
                                <td>{resident.occupation}</td>
                                <td>{resident.street}</td>
                                <td>
                                    <Link to={`/update/${resident._id}`} className="btn btn-outline-primary mr-1 mb-1"> Update Residency</Link>
                                    <Link data-value={`${resident._id}`} onClick={deleteResidency} className="btn btn-outline-danger mr-1 mb-1"> Revoke Residency</Link>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <Routes>
                <Route path='/update/:id' element={<UpdateResident/>}></Route>
            </Routes>
        </>
    );
}

export default Census