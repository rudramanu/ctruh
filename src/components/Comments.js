import React from "react";
import "./Comments.css";
const Comments = ({ comment }) => {
  return (
    <div className="comment-container">
      <div className="user-info">
        <h5>{comment.email.split("@")[0]}</h5>
      </div>

      <div className="comment-content">
        <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default Comments;
