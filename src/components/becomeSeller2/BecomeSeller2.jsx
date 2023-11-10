import { Link, useNavigate } from 'react-router-dom';
import './becomeseller2.scss'
const BecomeSeller2 = () => {
    const navigate=useNavigate();
    return ([
        <div className="becomeseller2">
            <div className="container">
                <div className="item">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/6efbf3f896f8ad45ed66505a6df63a60-1636629911828/seller_onboarding_overview_do.png" alt="" />
                </div>
                <div className="item2">
                    <div className="header_item2">
                        <h1>What makes a successful Fiverr profile?</h1>
                        <p>Your first impression matters! Create a profile that will stand out from the crowd on Fiverr.</p>
                    </div>
                    <div className="title">
                        <div className="item">
                            <img src="/images/becomeseller2_1svg.svg" alt="" />
                            <p>Take your time in creating your profile so it’s exactly as you want it to be.</p>
                        </div>
                        <div className="item">
                            <img src="/images/becomeseller2_2.svg" alt="" />
                            <p>Add credibility by linking out to your relevant professional networks.</p>
                        </div>
                        <div className="item">
                            <img src="/images/becomeseller2_3.svg" alt="" />
                            <p>Accurately describe your professional skills to help you get more work.</p>
                        </div>
                    </div>
                    <div className="title">
                        <div className="item">
                            <img src="/images/becomeseller2_4.svg" alt="" />
                            <p>Put a face to your name! Upload a profile picture that clearly shows your face.</p>
                        </div>
                        <div className="item">
                            <img src="/images/becomeseller2_5.svg" alt="" />
                            <p>To keep our community secure for everyone, we may ask you to verify your ID.</p>
                        </div>
                    </div>
                    <button onClick={e=>navigate('/register')}>Create A new Account As Seller</button>
                    <Link to={'/becomeSeller'} className='link' style={{ margin: "30px", color: "blue" }}>back</Link>
                </div>
            </div>
        </div>
    ]);
}

export default BecomeSeller2;