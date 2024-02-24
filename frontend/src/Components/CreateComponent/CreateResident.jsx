import React, {useState} from 'react'; //a hook that allows the programmer to add state to a functional component. It returns an array with two values: the current state and a function to update it
import axios from "axios";

function CreateResident() {
    const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [profilePicture, setProfilePicture] = useState('');
    // const [street, setStreet] = useState('');
    // const [physicalFeatures, setPhysicalFeatures] = useState('');
    // const [occupation, setOccupation] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
        console.log("The form has been submitted");
        let residentData = {
            firstName : firstName
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/submitResident`, residentData)
            .then((response) => {
                if (response.data.errors) {
                        console.log("This console log is means the form did not submit. Errors:", response.data.errors)
                }  else {
                    console.log("The form successfully submitted. Data:", residentData);
                }
        })
    }

    return(
        <>
            <div className="container-fluid">
                <h1 className='text-center'>Create Residency</h1>
                <p> Environment Variable: {process.env.REACT_APP_BACKEND_URL}</p>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='firstName' placeholder='First Name' onChange={event => setFirstName(event.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </>
    );
}

export default CreateResident