import React, { useState } from "react";
import './featured.scss';
import{ useNavigate} from 'react-router-dom';

function Featured() {
  const [input,setinput]=useState("");
  const navigate=useNavigate();
  const handlesubmit=()=>{
    navigate(`gigs?search=${input}`);
  }
    return (
     [ 
      <div className="featured">
        <div className="container">
          <div className="left">
            <h1>
              Find the perfect <span>freelance</span> <br></br>
              <span>services</span> for your business
            </h1>
            <div className="search">
              <div className="searchInput">
                <img src="/images/search.png" alt="" />
                <input type="text" placeholder='Try "building mobile app"' onChange={e=>setinput(e.target.value)} />
              </div>
              <button onClick={handlesubmit}>Search</button>
            </div>
            <div className="popular">
              <span>Popular:</span>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>Web Design</button>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>WordPress</button>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>Logo Design</button>
              <button onClick={e=>navigate(`gigs?search=${e.target.innerHTML}`)}>AI Services</button>
            </div>
          </div>
        </div>
      </div>]
    );
  }
export default Featured;