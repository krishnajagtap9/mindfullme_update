import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaHeart,
  FaComment,
  FaBookmark,
} from "react-icons/fa";
import { LuSmilePlus } from "react-icons/lu";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const Item6 = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const userName = user?.fullName || "Anonymous";
  const userProfileImageUrl = user?.imageUrl || "";

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("https://mindfullme-update-q1z8.onrender.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const postData = {
      name: userName,
      text: newPost,
      tags: ["General"],
      imageUrl: userProfileImageUrl,
    };

    axios
      .post("https://mindfullme-update-q1z8.onrender.com/posts", postData)
      .then((res) => {
        setPosts([res.data, ...posts]);
        setNewPost("");
      });
  };

  const handleLike = (postId) => {
    axios
      .patch(`https://mindfullme-update-q1z8.onrender.com/posts/${postId}/like`)
      .then((res) => {
        setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
      });
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs({ ...commentInputs, [postId]: text });
  };

  const handleCommentSubmit = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const commentData = {
      name: userName,
      text: commentText,
      imageUrl: userProfileImageUrl,
    };

    axios
      .post(`https://mindfullme-update-q1z8.onrender.com/posts/${postId}/comment`, commentData)
      .then((res) => {
        setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
        setCommentInputs({ ...commentInputs, [postId]: "" });
      });
  };

  if (!isLoaded)
    return <div className="p-4 text-center">Loading user data...</div>;
  if (!isSignedIn)
    return (
      <div className="p-4 text-center text-gray-600">
        Please sign in to create and view posts.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4 bg-[#F0F0F0]">
      {/* Create Post */}
      <div className="p-4 rounded-lg shadow-md bg-white">
        <div className="flex items-center gap-3 mb-3">
          {userProfileImageUrl ? (
            <img
              src={userProfileImageUrl}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-3xl" />
          )}
          <span className="font-semibold text-gray-800">{userName}</span>
        </div>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 resize-none text-sm"
          rows="3"
          placeholder="What's on your mind?"
        />
        <div className="flex justify-between mt-2 flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition flex items-center gap-2">
              <LuSmilePlus /> Add Mood
            </button>
          </div>
          <button
            onClick={handlePost}
            className="px-4 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={
                post.imageUrl
                  ? post.imageUrl
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(post.name)}&background=random`
              }
              className="w-9 h-9 rounded-full object-cover"
              alt="Post Author"
            />
            <div>
              <p className="font-semibold text-gray-800">{post.name}</p>
              <p className="text-xs text-gray-500">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <p className="mt-2 text-gray-700 text-sm">{post.text}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Post Actions */}
          <div className="flex gap-5 text-sm text-gray-600 mt-3">
            <button
              onClick={() => handleLike(post._id)}
              className="flex items-center gap-1 hover:text-red-500 transition"
            >
              <FaHeart /> {post.likes}
            </button>
            <span className="flex items-center gap-1">
              <FaComment /> {post.commentsCount}
            </span>
            <button className="flex items-center gap-1 hover:text-yellow-500 transition">
              <FaBookmark /> Save
            </button>
          </div>

          {/* Comment Input */}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInputs[post._id] || ""}
              onChange={(e) => handleCommentChange(post._id, e.target.value)}
              className="w-full border border-gray-300 rounded p-1 text-sm"
            />
            <button
              onClick={() => handleCommentSubmit(post._id)}
              className="mt-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
            >
              Comment
            </button>
          </div>

          {/* Show Comments */}
          <div className="mt-3 space-y-2">
            {post.comments?.slice().reverse().map((cmt, i) => (
              <div key={i} className="flex items-start gap-2">
                <img
                  src={
                    cmt.imageUrl
                      ? cmt.imageUrl
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(cmt.name)}&background=random`
                  }
                  alt="Commenter"
                  className="w-6 h-6 rounded-full mt-1"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{cmt.name}</span>:{" "}
                    {cmt.text}
                  </p>
                  <p className="text-xs text-gray-400">
                    {moment(cmt.time).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item6;
