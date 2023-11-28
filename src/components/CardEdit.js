import React from "react";

const CardEdit = ({
  post,
  setPost,
  setBody,
  title,
  body,
  setTitle,
  handleUpdatePost,
  handleCancelEdit,
}) => {
  return (
    <div>
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Body"
          ></textarea>
          <div>
            <button onClick={handleCancelEdit}>cancel</button>
            <button type="submit">Update Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEdit;
