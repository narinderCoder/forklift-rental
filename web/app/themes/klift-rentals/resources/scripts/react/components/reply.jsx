import { useEffect, useState } from "react";

const Reply = ({ cmt, setComment, reply, noReply = false, handleSubmit, showInput, setShowInput, ...rest }) => {


  useEffect(() => {
  setComment("")
  }, [showInput])
  

  return (
    <div className={`d-flex gap-2`} {...rest}>
      <img
      src={reply.author.picture}
        className="bg-secondary bg-opacity-50 rounded-circle"
        style={{ width: "2rem", height: "2rem", marginTop: "0.25rem" }}
      />
      <div className="flex-grow-1">
    
          <p className="p1 fw-medium">{reply.author.name}</p>
        
     
        <p className="p2 text-secondary text-opacity-70">{reply.content}</p>
        <div className="d-flex align-items-center gap-2 mb-2">
        <p className="p2 text-secondary text-opacity-70">{reply.date}</p>
        <button
            className={`${noReply ? "d-none" : "d-flex"} p-0 p3 text-primary`}
            onClick={() => showInput === reply.id ? setShowInput(null) : setShowInput(reply.id)}
            style={{ marginTop: "0.15rem" }}
          >
            Reply
          </button>
        
        </div>
        <textarea
          className={`${
            showInput === reply.id ? "d-flex" : "d-none"
          } p-2 rounded-1 my-2 bg-white w-100 input-primary textarea-primary`}
          onChange={(e) => setComment(e.target.value)}
          value={cmt}
        />
        <button
          className={`${
            showInput === reply.id ? "d-flex" : "d-none"
          } bg-primary text-white btn-secondary`}
          onClick={() => {
            handleSubmit(reply.id);
            setShowInput(null); }}
        >
          Reply
        </button>
        {reply.replies && reply.replies.length > 0
          ? reply.replies.map((newReply, index) => (
              <Reply
              showInput={showInput} setShowInput={setShowInput} 
              cmt={cmt} setComment={setComment}
                handleSubmit={handleSubmit}
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
