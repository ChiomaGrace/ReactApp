import React, {useState, useEffect} from 'react' //useState is a hook that allows the programmer to track a state in a functional component. It returns an array with two values: the current state and a function to update it. useEffect is a hook that allows the programmer to fetch data and update the DOM
import axios from "axios"; //a promised bassed HTTP library that makes API requests to the backend
import { useParams } from "react-router-dom"; //useParams is a hook that allows access to the URL parameters within components. It retreives the value of the parameter specificed in the route and makes it available for further use.
import styles from "./UpdateResident.module.css";

function UpdateResident() {
    const [resident, setResident] = useState([]);
    const {id} = useParams();
    // console.log("Resident ID:", id);
    const [isFetched, setIsFetched] = useState(false);

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/specificResident/${id}`)
        .then((response) => {
            // console.log("Specific Resident Data:", response.data);
            setResident(response.data);
            setIsFetched(true);
            // console.log("Fetched Data:", isFetched);
        })
        .catch(error => console.log(error))
    }, [])

    const [isToggled, setToggle] = useState(false);
    const toggleStatus = {};    
    const editButton = (event) => {
        // console.log("The edit button was clicked.");
        const value = event.currentTarget.getAttribute("data-value");
        // console.log(value)
        if ( value === "firstName"  ) {
            // console.log('The firstName edit button was selected.')
            toggleStatus.firstNameEditButton = true;
        }
        if ( value === "lastName"  ) {
            // console.log('The lastName edit button was selected.')
            toggleStatus.lastNameEditButton = true;
        }
        if ( value === "profilePicture"  ) {
            // console.log('The lastName edit button was selected.')
            toggleStatus.profilePictureEditButton = true;
        }
        if ( value === "occupation"  ) {
            // console.log('The occupation edit button was selected.')
            toggleStatus.occupationEditButton = true;
        }
        if ( value === "street"  ) {
            // console.log('The street edit button was selected.')
            toggleStatus.streetEditButton = true;
        }
        if ( value === "physicalFeaturesSex"  ) {
            // console.log('The physicalFeaturesSex edit button was selected.')
            toggleStatus.physicalFeaturesSexEditButton = true;
        }
        if ( value === "physicalFeaturesEyeColor"  ) {
            // console.log('The physicalFeaturesEyeColor edit button was selected.')
            toggleStatus.physicalFeaturesEyeColorEditButton = true;
        }
        if ( value === "physicalFeaturesHairColor"  ) {
            // console.log('The physicalFeaturesHairColor edit button was selected.')
            toggleStatus.physicalFeaturesHairColorEditButton = true;
        }
        setToggle(toggleStatus)
    }
    // console.log("isToggled:", isToggled)

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
    // for ( const [key, value] of formData) {
        // console.log(`Form Data: This is the ${key}, and this is the ${value}.`);
    // }

    const updateResidentForm = (event) => {
        event.preventDefault();
        // console.log("The updateResidentForm button has been clicked.");
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateResident/${id}`, formData)
        .then((response) => {
            if (response.data.errors) {
                console.log("This console log means the form did not submit successfully because there was a backend validation error. Errors:", response.data.errors);
            }  else {
                // console.log("The form successfully submitted to the backend");
                for ( const [key, value] of formData) {
                    // console.log(`Submitted Data: This is the key: ${key}, and this is the value: ${value}.`);
                }
                setToggle(false);
                if ( formData.get("firstName") ) {
                    // console.log("This means the firstName value was changed, so we need to update the object.");
                    resident.firstName = formData.get("firstName");
                    setResident(resident);
                } 
                if ( formData.get("lastName") ) {
                    // console.log("This means the lastName value was changed, so we need to update the object.");
                    resident.lastName = formData.get("lastName");
                    setResident(resident);
                } 
                if ( formData.get("profilePicture") ) {
                    // console.log("This means the profilePicture value was changed, so we need to update the object.");
                    resident.profilePicture = formData.get("profilePicture");
                    setResident(resident);
                } 
                if ( formData.get("occupation") ) {
                    // console.log("This means the occupation value was changed, so we need to update the object.");
                    resident.occupation = formData.get("occupation");
                    setResident(resident);
                } 
                if ( formData.get("street") ) {
                    // console.log("This means the street value was changed, so we need to update the object.");
                    resident.street = formData.get("street");
                    setResident(resident);
                } 
                if ( formData.get("physicalFeaturesSex") ) {
                    // console.log("This means the physicalFeaturesSex value was changed, so we need to update the object.");
                    resident.physicalFeatures.sex = formData.get("physicalFeaturesSex");
                    setResident(resident);
                } 
                if ( formData.get("physicalFeaturesEyeColor") ) {
                    // console.log("This means the physicalFeaturesEyeColor value was changed, so we need to update the object.");
                    resident.physicalFeatures.eyeColor = formData.get("physicalFeaturesEyeColor");
                    setResident(resident);
                } 
                if ( formData.get("physicalFeaturesHairColor") ) {
                    // console.log("This means the physicalFeaturesHairColor value was changed, so we need to update the object.");
                    resident.physicalFeatures.hairColor = formData.get("physicalFeaturesHairColor");
                } 
                setResident(resident);
            }
        });
    }

    return(
        <div className='container'>
            { isFetched &&
                <>
                    <h1 className='text-center'>Update Residency of {resident.firstName} {resident.lastName} </h1>
                    <div className='row'>
                        <div className="col">
                            <img src={resident.profilePicture} alt={`${resident.firstName} ${resident.lastName} from the 1999 Nickeloden Telvision Show Spongebob SquarePants`}/>
                            {isToggled.profilePictureEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <input className="form-control" type="file" onChange={event => setProfilePicture(event.target.files[0])}/>
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <span className="text-primary" data-value="profilePicture" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                        </div>
                        <div className={`col ${styles.residentInfo} `}>
                            <div className={styles.inputDiv}>
                                <p className=''>First Name:</p>
                                {isToggled.firstNameEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <input className={`form-control ${styles.formInput}`} type='text' placeholder={resident.firstName} onChange={event => setFirstName(event.target.value)}/> 
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.firstName} </p> 
                                            <span className="text-primary" data-value="firstName" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                            <div className={styles.inputDiv}>
                                <p className=''>Last Name:</p>
                                {isToggled.lastNameEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <input className={`form-control ${styles.formInput}`} type='text' placeholder={resident.lastName} onChange={event => setLastName(event.target.value)}/> 
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.lastName} </p> 
                                            <span className="text-primary" data-value="lastName" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                            <div className={styles.inputDiv}>
                                <p className=''>Occupation:</p>
                                {isToggled.occupationEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <input className={`form-control ${styles.formInput}`} type='text' placeholder={resident.occupation} onChange={event => setOccupation(event.target.value)}/> 
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.occupation} </p> 
                                            <span className="text-primary" data-value="occupation" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                            <div className={styles.inputDiv}>
                                <p className=''>Address:</p>
                                {isToggled.streetEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <input className={`form-control ${styles.formInput}`} type='text' placeholder={resident.street} onChange={event => setStreet(event.target.value)}/> 
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.street} </p> 
                                            <span className="text-primary" data-value="street" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                            <div className={styles.inputDiv}>
                                <p className=''>Sex:</p>
                                {isToggled.physicalFeaturesSexEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <select className={`form-select ${styles.formSelect}`} onChange={event => setPhysicalFeaturesSex(event.target.value)} defaultValue={setPhysicalFeaturesSex}>
                                                    <option>Sex</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                </select>
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.physicalFeatures.sex} </p> 
                                            <span className="text-primary" data-value="physicalFeaturesSex" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                            <div className={styles.inputDiv}>
                                <p className=''>Eye Color:</p>
                                {isToggled.physicalFeaturesEyeColorEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <select className={`form-select ${styles.formSelect}`} onChange={event => setPhysicalFeaturesEyeColor(event.target.value)} defaultValue={setPhysicalFeaturesEyeColor}>
                                                    <option>Select Eye Color</option>
                                                    <option value="Black">Black</option>
                                                    <option value="Blue">Blue</option>
                                                    <option value="Brown">Brown</option>
                                                    <option value="Orange">Orange</option>
                                                    <option value="Red">Red</option>
                                                </select>
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.physicalFeatures.eyeColor} </p> 
                                            <span className="text-primary" data-value="physicalFeaturesEyeColor" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                            <div className={styles.inputDiv}>
                                <p className=''>Hair Color:</p>
                                {isToggled.physicalFeaturesHairColorEditButton ? 
                                    (
                                        <>
                                            <form onSubmit={updateResidentForm}>
                                                <select className={`form-select ${styles.formSelect}`} onChange={event => setPhysicalFeaturesHairColor(event.target.value)} defaultValue={setPhysicalFeaturesHairColor}>
                                                    <option>Select Hair Color</option>
                                                    <option value="Green">Green</option>
                                                    <option value="Red">Red</option>
                                                    <option value="Pink">Pink</option>
                                                    <option value="Yellow">Yellow</option>
                                                </select>
                                                <button className={`text-success ${styles.formButton}`}> Save</button>
                                            </form>
                                        </>
                                    ) : ( 
                                        <>
                                            <p className=''> {resident.physicalFeatures.hairColor} </p> 
                                            <span className="text-primary" data-value="physicalFeaturesHairColor" onClick={editButton}> Edit</span>
                                        </>
                                    )
                                } 
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default UpdateResident