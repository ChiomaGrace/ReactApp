import React, {useState} from 'react'; //a hook that allows the programmer to add state to a functional component. It returns an array with two values: the current state and a function to update it

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
        // fetch( `${process.env.REACT_APP_BACKEND_URL}/submitResident`, {
        // fetch( 'https://react-app-backend-production.up.railway.app/submitResident', {
        fetch( 'http://127.0.0.1:8000/submitResident', {
            method: 'post',
            headers:{ 
                'Access-Control-Allow-Origin' : '*',
                "Content-type": "application/json",   
            },

            // headers: {
            //     "Content-type": "application/json",   
            // },
            body: JSON.stringify(residentData)
        })

        // axios
        // .post(`${process.env.REACT_APP_BACKEND_URL}/submitResident`, residentData)
        // .then((res) => {
        //   console.log("Response:", res);
        // })
        // .catch((error) => {
        //     console.log("Errors:", error);
        // })
    }

    // const handleSubmit = async(event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('firstName', firstName);
    //     await SharedService.createResidentService(formData)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     const newResident = { firstName };
    //     console.log("New resident:", newResident);
    
    //     // setfirstname("");
    //     // setlastname("");
    
    //     //making post request to create a new person
    //     axios
    //       .post( process.env.REACT_APP_BACKEND_URL + '/submitResident', newResident)
    //       .then((res) => {
    //         console.log(res);
    //         if (res.data.errors) {
            //   seterrors(res.data.errors);
    //             console.log("errors")
    //         } 
    //       })
    //       .catch((error) => console.log(error));
    //   };

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