import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import CardEdit from "./CardEdit";
import "./CardDetails.css";

const CardDetails = () => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [showEditPost, setShowEditPost] = useState(false);
  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  const handleUpdatePost = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { title, body }
      );

      if (response.status === 200) {
        console.log("Post updated:", response.data);
        setPost(response.data);
        // Update title and body in the state
        setTitle(response.data.title);
        setBody(response.data.body);
        setShowEditPost(false); // Hide the edit form
      } else {
        console.error("Unexpected status code:", response.status);
        // Handle unexpected status codes or errors here
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
      // Handle specific error cases or set a general error state
    }
  };

  return (
    <div className="post-details">
      <div>
        <Link to={"/"}>
          <button>Return to Home</button>
        </Link>
      </div>

      <>
        {showEditPost && (
          <CardEdit
            post={post}
            setPost={setPost}
            setBody={setBody}
            title={title}
            body={body}
            setTitle={setTitle}
            handleUpdatePost={handleUpdatePost}
            handleCancelEdit={() => setShowEditPost(false)}
          />
        )}

        <div className="post-card">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <hr />
          <div>
            <button
              onClick={() => {
                setShowEditPost(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div>
          <h4>Comments:</h4>
          {comments?.map((comment) => (
            <Comments key={comment.id} comment={comment} />
          ))}
        </div>
      </>
    </div>
  );
};

export default CardDetails;
