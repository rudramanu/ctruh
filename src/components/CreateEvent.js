import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";

const CreateEvent = ({ post, setPost, onCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId: 1,
        }
      );
      console.log("Created post:", response.data);
      let updatedPost = [...post, response.data];
      updatedPost = updatedPost.reverse();
      setPost(updatedPost);
      setBody("");
      setTitle("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const cancelEvent = () => {
    onCancel();
  };
  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <div>
              <button className="cancel" onClick={cancelEvent}>
                cancel
              </button>
              <button type="submit">Create Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
