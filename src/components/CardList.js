import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CardList.css";
import CreateEvent from "./CreateEvent";

const CardList = () => {
  const [initialPost, setInitialPost] = useState([]);
  const [post, setPost] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log(response);
        setPost(response.data);
        setInitialPost(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);
  const handleLikedEvent = (id) => {
    const likedEvents = post.map((el) => {
      if (el.id === id) {
        // Toggle the 'liked' property without using the ! symbol
        return { ...el, liked: el.liked ? false : true };
      } else {
        return el;
      }
    });

    setPost(likedEvents);
  };

  const handleFavouriteEvent = (id) => {
    const favouriteEvents = post.map((el) => {
      if (el.id === id) {
        // Toggle the 'liked' property without using the ! symbol
        return { ...el, favourite: el.favourite ? false : true };
      } else {
        return el;
      }
    });

    setPost(favouriteEvents);
  };

  const likedEvents = post.filter((el) => el.liked);

  const favouriteEvents = post.filter((el) => el.favourite);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      alert("Post Successfully Deleted!");
      setPost(post.filter((el) => el.id !== id));
      console.log("Deleted post:", id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleCancelCreateEvent = () => {
    setShowCreateEvent(false);
  };

  return (
    <div className="card-container">
      <h1>Here are all the list!</h1>
      <button
        onClick={() => {
          setPost(initialPost);
        }}
        className="home"
      >
        🏠
      </button>
      <button
        onClick={() => {
          setPost(likedEvents);
        }}
        className="liked"
      >
        Liked Events
      </button>
      <button
        onClick={() => {
          setPost(favouriteEvents);
        }}
        className="fav"
      >
        Favourite Events
      </button>
      <button
        onClick={() => {
          setShowCreateEvent(true);
          setPost(initialPost);
        }}
        className="addnew"
      >
        Add New Event
      </button>

      {showCreateEvent && (
        <CreateEvent
          post={post}
          setPost={setPost}
          onCancel={handleCancelCreateEvent}
        />
      )}
      <div className="card-list">
        {post.map((el) => (
          <div className="card" key={el.id}>
            <Link to={`/post/${el.id}`}>
              <>
                <h2 className="card-title">
                  {el.title.length > 15
                    ? el.title.substring(0, 15) + "..."
                    : el.title}
                </h2>
                <p className="card-body">
                  {el.body.length > 50
                    ? el.body.substring(0, 50) + "..."
                    : el.body}
                </p>
              </>
            </Link>
            <div className="card-buttons">
              <button
                onClick={() => handleLikedEvent(el.id)}
                className="like-button"
              >
                {el.liked ? "Unlike" : "Like"}
              </button>
              <button
                onClick={() => handleFavouriteEvent(el.id)}
                className="favourite-button"
              >
                {el.favourite ? "Favourited" : "Favourite"}
              </button>
              <button
                onClick={() => {
                  handleDelete(el.id);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
