import { Link, useNavigate } from 'react-router-dom';
import './becomeseller.scss'

const BecomeSeller=()=>{
    const navigate=useNavigate();
    return([
        <div className="becomeseller">
                <div className="container">
                    <div className="item">
                        <h1>Ready to start selling on Fiverr? Here’s the breakdown:</h1>
                        <hr />
                        <div className="title">
                            <img src="/images/becomeseller1.svg" alt="check" />
                            Learn what makes a successful profile
                        </div>
                        <p>Discover the do’s and don’ts to ensure you’re always on the right track.</p>
                        <hr />
                        <div className="title">
                            <img src="/images/becomeseller2.svg" alt="check" />
                            Create your seller profile
                        </div>
                        <p>Add your profile picture, description, and professional information.</p>
                        <hr />
                        <div className="title">
                            <img src="/images/becomeseller3.svg" alt="check" />
                            Publish your Gig
                        </div>
                        <p>Create a Gig of the service you’re offering and start selling instantly.</p>
                        <hr />
                    </div>
                    <div className="item">
                        <video src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/966b0ae895e85b526600eff1d21e3cf4-1674728725728/Seller%20onboarding%20video%20HQ" controls width='100%'></video>
                    </div>
                   
                </div>
                <button onClick={e=>navigate('/becomeSeller2')}>Become Seller</button>
                <Link to={'/'} className='link' style={{marginLeft:"10px",color:"blue"}}>back</Link>
            </div>
            
    ]);
}

export default BecomeSeller;