import React from "react";
import './catCard.scss'
import { Link } from "react-router-dom";


const CatCard = ({item}) => {
  
    return ([
        <Link to={`/gigs?cat=${item.title}`}>
        <div className="catCard">
           <img src={item.img} alt="" srcSet="" />
           <span className="desc">{item.desc}</span>
           <span className="title">{item.title}</span>
           <span></span>
        </div>
        </Link>
    ]);
}
export default CatCard;