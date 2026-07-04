import React from "react";
import "./message.scss";
import { Link, useParams } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import newRequest from "../../utils/newRequest";
import { useRef,useEffect } from "react";
const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const messageRef = useRef();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["messages", id],

      queryFn: ({ pageParam = 1 }) =>
        newRequest
          .get(`/messages/${id}?page=${pageParam}&limit=20`)
          .then((res) => res.data),

      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
    });
  const { data: currentUserData } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
  const messages = data?.pages.flatMap((page) => page.messages) ?? [];

  console.log(currentUserData);
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      toast.success("Message sent successfully");
    },
    onError: () => {
      toast.error("Unable to send message. Please try again.");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target[0].value.trim();
    if (!messageText) {
      toast.warn("Write a message before sending.");
      return;
    }
    mutation.mutate({
      conversationId: id,
      desc: messageText,
    });
    e.target[0].value = "";
  };

  useEffect(() => {
    if (!messageRef.current) return;

    messageRef.current.scrollTop =
        messageRef.current.scrollHeight;
}, [messages.length]);

  const handleScroll = async () => {
    const div = messageRef.current;

    if (div.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const oldHeight = div.scrollHeight;

      await fetchNextPage();

      requestAnimationFrame(() => {
        const newHeight = div.scrollHeight;

        div.scrollTop = newHeight - oldHeight;
      });
    }
  };
  return [
    <div className="message" >
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            MESSAGES
          </Link>
        </span>

        <div className="messages" ref={messageRef} onScroll={handleScroll}>
          {messages.map((m) => (
            <div
              className={m.userId === currentUser._id ? "owner item" : "item"}
              key={m._id}
            >
              <img
                src={
                  m.userId === currentUser._id
                    ? `/images/noavtar.jpeg`
                    : "/images/noavtar.jpeg"
                }
                alt=""
              />
              <p>{m.desc}</p>
            </div>
          ))}
        </div>

        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            id=""
            placeholder="write a message"
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>,
  ];
};
export default Message;
