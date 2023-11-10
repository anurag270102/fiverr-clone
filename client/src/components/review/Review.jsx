import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import "./review.scss";
const Review = ({ review }) => {
  const [like, setlike] = useState(false);
  const [dislike, setdislike] = useState(false);
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => {
          return res.data;
        }),
    },
  );
  console.log(error);
  const handlelike=() => {
    setlike(true);
  }
  const handledislike=() => {
    setdislike(true);
  }
  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/images/noavtar.jpeg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/images/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        {<img src={like?'/images/like.png':'/images/likeColor.png'} alt="" onClick={handlelike} />}
        <span>Yes</span>
        <img src={dislike?'/images/dislike.png':'/images/dislike_color.png'} alt="" onClick={handledislike} />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;