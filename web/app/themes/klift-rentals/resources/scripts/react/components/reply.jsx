import { useState } from "react";

const Reply = ({ reply, noReply = false, ...rest }) => {
  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);
  console.log(reply, "working");
  return (
    <div className={`d-flex gap-2`} {...rest}>
      <div
        className="bg-secondary bg-opacity-50 rounded-circle"
        style={{ width: "2rem", height: "2rem", marginTop: "0.25rem" }}
      ></div>
      <div className="flex-grow-1">
        <div className="d-flex align-items-center gap-2">
          <p className="p1 fw-medium">{reply.user}</p>
          <button
            className={`${noReply ? "d-none" : "d-flex"} p-0 p3 text-primary`}
            onClick={() => setShowInput(!showInput)}
            style={{ marginTop: "0.15rem" }}
          >
            Reply
          </button>
        </div>
        <p className="p2">{reply.comment}</p>
        <textarea
          className={`${
            showInput ? "d-flex" : "d-none"
          } p-2 rounded-1 my-2 bg-white w-100 input-primary textarea-primary`}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          className={`${
            showInput ? "d-flex" : "d-none"
          } bg-primary text-white btn-secondary`}
          onClick={() => {}}
        >
          Reply
        </button>
        {reply.replies.length > 0
          ? reply.replies.map((newReply, index) => (
              <Reply
                reply={newReply}
                key={index}
                className="pt-2 d-flex gap-2"
                noReply
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Reply;
