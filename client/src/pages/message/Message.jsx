import React from "react";
import './message.scss';
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  const { data: currentUserData } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  console.log(currentUserData);
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = " "
  };
  return ([
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to='/messages' className="link" >MESSAGES</Link> &gt { };
        </span>
        {isLoading ? "Loading" : error ? "something wnt wrong" : <div className="messages">
          {data.map((m) => (
            <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
              <img
                src={m.userId === currentUser._id ? `/images/noavtar.jpeg` : '/images/noavtar.jpeg'}
                alt=""
              />
              <p>
                {m.desc}
              </p>
            </div>))}
        </div>}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea name="" id="" placeholder="write a message" cols="30" rows="10"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  ]);
}
export default Message;