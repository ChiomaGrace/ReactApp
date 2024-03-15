import React, {useState} from 'react'; //a hook that allows the programmer to add state to a functional component. It returns an array with two values: the current state and a function to update it
import axios from "axios"; //a promised bassed HTTP library that makes API requests to the backend
import styles from "./CreateResident.module.css"

function CreateResident() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [physicalFeaturesSex, setPhysicalFeaturesSex] = useState('');
    const [physicalFeaturesHairColor, setPhysicalFeaturesHairColor] = useState('');
    const [physicalFeaturesEyeColor, setPhysicalFeaturesEyeColor] = useState('');
    const [street, setStreet] = useState('');
    const [occupation, setOccupation] = useState('');

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('profilePicture', profilePicture);
    formData.append('physicalFeaturesSex', physicalFeaturesSex)
    formData.append('physicalFeaturesHairColor', physicalFeaturesHairColor)
    formData.append('physicalFeaturesEyeColor', physicalFeaturesEyeColor)
    formData.append('street', street)
    formData.append('occupation', occupation)

    const [frontSideErrors, setErrors] = useState({});
    const clientErrors = {};
    const [backendErrors, setBackendErrors] = useState({});
    const serverErrors = {}
    const [submitted, setSubmitted] = useState(false);

    const clientSideValidation = () => {
        let isValid = true;
        if( !firstName ) {
            clientErrors.firstName = "Please submit a first name.";
            isValid = false;
        }
        if( !lastName ) {
            clientErrors.lastName = "Please submit a last name.";
            isValid = false;
        }
        if( !profilePicture ) {
            clientErrors.profilePicture = "Please upload a profile picture.";
            isValid = false;
        }
        if( !physicalFeaturesSex ) {
            clientErrors.physicalFeaturesSex = "Please select a sex";
            isValid = false;
        }
        if( !physicalFeaturesHairColor ) {
            clientErrors.physicalFeaturesHairColor = "Please select a hair color";
            isValid = false;
        }
        if( !physicalFeaturesEyeColor ) {
            clientErrors.physicalFeaturesEyeColor = "Please select an eye color";
            isValid = false;
        }
        if( !street ) {
            clientErrors.street = "Please submit an address.";
            isValid = false;
        }
        if( !occupation ) {
            clientErrors.occupation = "Please submit an occupation";
            isValid = false;
        }

        setErrors(clientErrors);

        return isValid;
    };

    const createResidentForm = (event) => {
        event.preventDefault();
        // console.log("The creatResident form button has been clicked.");
        if (clientSideValidation()) {
            // console.log("This console log means the form passed front end validations. Form Data:", formData);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/submitResident`, formData)
            .then((response) => {
                if (response.data.errors) {
                    console.log("This console log means the form did not submit successfully because there was a backend validation error. Errors:", response.data.errors);
                    for ( let specificBackendError of Object.values(response.data.errors) ) {
                        if (specificBackendError.path === 'firstName') {
                            serverErrors.firstName = specificBackendError.message;
                            console.log("First Name backend error:", serverErrors.firstName);
                        }
                        if (specificBackendError.path === 'lastName') {
                            serverErrors.lastName = specificBackendError.message;
                            console.log("Last Name backend error:", serverErrors.lastName);
    
                        }
                        if (specificBackendError.path === 'profilePicture') {
                            serverErrors.profilePicture = specificBackendError.message;
                            console.log("Profile Picture backend error:", serverErrors.profilePicture);
                        }
                        if (specificBackendError.path === 'street') {
                            serverErrors.street = specificBackendError.message;
                            console.log("Street backend error:", serverErrors.street);
                        }
                        if (specificBackendError.path === 'physicalFeatures.sex') {
                            serverErrors.physicalFeaturesSex = specificBackendError.message;
                            console.log("Physical Feature Sex backend error:", serverErrors.physicalFeaturesSex);
                        }
                        if (specificBackendError.path === 'physicalFeatures.hairColor') {
                            serverErrors.physicalFeaturesHairColor = specificBackendError.message;
                            console.log("Physical Feature Hair Color backend error:", serverErrors.physicalFeaturesHairColor);
                        }
                        if (specificBackendError.path === 'physicalFeatures.eyeColor') {
                            serverErrors.physicalFeaturesEyeColor= specificBackendError.message;
                            console.log("Physical Feature Eye Color backend error:", serverErrors.physicalFeaturesEyeColor);
                        }
                        if (specificBackendError.path === 'occupation') {
                            serverErrors.occupation = specificBackendError.message;
                            console.log("Occupation backend error:", serverErrors.occupation);
                        }
                    }
                    setBackendErrors(serverErrors)
                    // console.log("Backend Errors:", serverErrors);
                }  else {
                    setSubmitted(true);
                    // console.log("The form successfully submitted to the backend. Submitted Data:");
                    for (const [key, value] of formData) {
                        // console.log(key, value);
                    }
                }
            });
        } else {
            console.log("This console log means the form did not pass front end validations", clientErrors);
        }
    };

    return(
        <>
            <div className="container-fluid">
                <h1 className='text-center'>Create Residency</h1>
                <p> Environment Variable: {process.env.REACT_APP_BACKEND_URL}</p>
                {submitted ? (
                    <div className={styles.successMessage}>Form submitted successfully!</div>
                ) : (
                    <form onSubmit={createResidentForm}>
                        <div className='row'>
                            {frontSideErrors.firstName && <div className={styles.error}>{ frontSideErrors.firstName}</div>}
                            {backendErrors.firstName && <div className={styles.error}>{ backendErrors.firstName}</div>} {/* how to setup for a backend validation */}
                            {frontSideErrors.lastName && <div className={styles.error}>{ frontSideErrors.lastName}</div>}
                            {frontSideErrors.profilePicture && <div className={styles.error}>{ frontSideErrors.profilePicture}</div>}
                            {frontSideErrors.physicalFeaturesSex && <div className={styles.error}>{ frontSideErrors.physicalFeaturesSex}</div>}
                            {frontSideErrors.physicalFeaturesHairColor && <div className={styles.error}>{ frontSideErrors.physicalFeaturesHairColor}</div>}
                            {frontSideErrors.physicalFeaturesEyeColor && <div className={styles.error}>{ frontSideErrors.physicalFeaturesEyeColor}</div>}
                            {frontSideErrors.street && <div className={styles.error}>{ frontSideErrors.street}</div>}
                            {frontSideErrors.occupation && <div className={styles.error}>{ frontSideErrors.occupation}</div>}
                            <div className='col'>
                                <input className="form-control" type='text' placeholder='First Name' onChange={event => setFirstName(event.target.value)}/>
                            </div>
                            <div className='col'>
                                <input className="form-control" type='text' placeholder='Last Name' onChange={event => setLastName(event.target.value)}/>
                            </div>
                        </div>
                        <div className='col mt-3 mb-3'>
                            <input className="form-control" type="file" onChange={event => setProfilePicture(event.target.files[0])}/>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Options</label>
                                    <select className="form-select" onChange={event => setPhysicalFeaturesSex(event.target.value)} defaultValue={setPhysicalFeaturesSex}>
                                        <option>Select Sex</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Options</label>
                                    <select className="form-select" onChange={event => setPhysicalFeaturesEyeColor(event.target.value)} defaultValue={setPhysicalFeaturesEyeColor}>
                                        <option>Select Eye Color</option>
                                        <option value="Black">Black</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Brown">Brown</option>
                                        <option value="Orange">Orange</option>
                                        <option value="Red">Red</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Options</label>
                                    <select className="form-select" onChange={event => setPhysicalFeaturesHairColor(event.target.value)} defaultValue={setPhysicalFeaturesHairColor}>
                                        <option>Select Hair Color</option>
                                        <option value="Green">Green</option>
                                        <option value="Red">Red</option>
                                        <option value="Pink">Pink</option>
                                        <option value="Yellow">Yellow</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input className="form-control" type='text'placeholder='Street' onChange={event => setStreet(event.target.value)}/>
                            </div>
                            <div className='col'>
                                <input className="form-control" type='text' placeholder='Occupation' onChange={event => setOccupation(event.target.value)}/>
                            </div>
                        </div>
                        <button className='btn btn-primary mt-3 mb-3'>Submit</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default CreateResident