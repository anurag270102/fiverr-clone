import React from "react";
import './gigCard.scss'
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [`${item.userId}`],
        queryFn: () =>
            newRequest.get(`/users/${item.userId}`)
                .then((res) => {
                    return res.data;
                })
            })
    return ([
        <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard ">
                <img src={item.cover} alt="" />
                <div className="info">
                    {isLoading ? "loading" : error ? "something wrong" : <div className="user">
                        <img src={data.img || '/images/noavtar.jpeg'} alt="" />
                        <span>{data.username}</span>
                    </div>}
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="/images/star.png" alt="" />
                        <span>
                            {!isNaN(item.totalStars / item.starNumber) &&
                                Math.round(item.totalStars / item.starNumber)}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="details">
                    <img src="/images/heart.png" alt="" />
                    <div className="price">
                        <span>STARING AT</span>
                        <h2>$ {item.price}<sup>99</sup></h2>
                    </div>
                </div>
            </div>
        </Link>
    ]);
}
export default GigCard;