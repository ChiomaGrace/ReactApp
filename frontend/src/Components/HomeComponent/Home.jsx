import spongebobAndCrew from '../../assets/images/spongebob-and-crew.png'
import bikiniBottom from '../../assets/images/bikini-bottom.png'

function Home() {
    return(
        <>
        <div className="container-fluid mt-5">
            <h1 className='text-center'>React CRUD App</h1> 
            <div className="row">
            <div className="col">
                <img src={spongebobAndCrew} alt="Characters from Spongebob SqaurePants."></img>
            </div>
            <div className="col">
                <img src={bikiniBottom} alt="Bikini Bottom, the underwater city that serves as the main setting of SpongeBob SquarePants."></img>
            </div>
            </div> 
        </div>
        </>
    );
}
export default Home