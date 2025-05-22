import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaHeart,
  FaComment,
  FaBookmark,
  FaReply,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaShareSquare,
} from "react-icons/fa";
import { LuSmilePlus } from "react-icons/lu";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

const suggestedTags = [
  "MentalHealth",
  "Mindfulness",
  "Wellness",
  "Support",
  "Gratitude",
  "Anxiety",
  "Depression",
];
const emojiList = [
  "😊",
  "😄",
  "😍",
  "👍",
  "🙏",
  "❤️",
  "😂",
  "😢",
  "🤩",
  "🎉",
];

const API_URL = "https://mindfullme-update-q1z8.onrender.com/api/posts";

const Item6 = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const userName = user?.fullName || "Anonymous";
  const userProfileImageUrl = user?.imageUrl || "";
  const userId = user?.id;

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostText, setEditPostText] = useState("");

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const fetchPosts = () => {
    axios
      .get(API_URL)
      .then((res) => {
        setPosts(res.data);
        const initialLikedPosts = {};
        res.data.forEach((post) => {
          if (post.likes && Array.isArray(post.likes) && post.likes.includes(userId)) {
            initialLikedPosts[post._id] = true;
          }
        });
        setLikedPosts(initialLikedPosts);
      })
      .catch((err) => console.error(err));
  };

  // Like/Unlike feature
  const handleLike = (postId) => {
    const liked = likedPosts[postId];
    const url = `${API_URL}/${postId}/like`;
    axios
      .patch(url, { userId })
      .then((res) => {
        setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
        setLikedPosts({ ...likedPosts, [postId]: !liked });
      })
      .catch((err) => console.error(err));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const finalTags = Array.from(
      new Set([
        ...postTags,
        ...tagInput
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      ])
    );
    const postData = {
      name: userName,
      text: newPost + (selectedEmoji ? " " + selectedEmoji : ""),
      tags: finalTags,
      imageUrl: userProfileImageUrl,
      userId: userId,
    };
    axios
      .post(API_URL, postData)
      .then((res) => {
        setPosts([res.data, ...posts]);
        setNewPost("");
        setPostTags([]);
        setTagInput("");
        setSelectedEmoji("");
        setShowEmojiPicker(false);
      })
      .catch((err) => console.error(err));
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
      userId: userId,
    };
    axios
      .post(`${API_URL}/${postId}/comment`, commentData)
      .then((res) => {
        setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
        setCommentInputs({ ...commentInputs, [postId]: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleReplyChange = (commentId, text) => {
    setReplyInputs({ ...replyInputs, [commentId]: text });
  };

  const handleReplySubmit = (postId, commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText?.trim()) return;
    const replyData = {
      name: userName,
      text: replyText,
      imageUrl: userProfileImageUrl,
      userId: userId,
    };
    axios
      .post(`${API_URL}/${postId}/comments/${commentId}/reply`, replyData)
      .then((res) => {
        setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
        setReplyInputs({ ...replyInputs, [commentId]: "" });
      })
      .catch((err) => console.error(err));
  };

  // --- Tag Handling Functions ---
  const handleAddSuggestedTag = (tag) => {
    if (!postTags.includes(tag)) {
      setPostTags([...postTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostTags(postTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // --- Post Delete ---
  const handleDeletePost = (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    axios
      .delete(`${API_URL}/${postId}`, { data: { userId } })
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
      })
      .catch((err) => console.error(err));
  };

  // --- Post Edit ---
  const handleEditPost = (post) => {
    setEditingPostId(post._id);
    setEditPostText(post.text);
  };

  const handleEditPostSave = (postId) => {
    if (!editPostText.trim()) return;
    axios
      .patch(`${API_URL}/${postId}`, { text: editPostText, userId })
      .then((res) => {
        setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
        setEditingPostId(null);
        setEditPostText("");
      })
      .catch((err) => console.error(err));
  };

  const handleEditPostCancel = () => {
    setEditingPostId(null);
    setEditPostText("");
  };

  // --- Emoji Picker for Share ---
  const handleShareEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
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
        {/* Tag Input and Suggested Tags */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Add tags (e.g., #MentalHealth, #Support)"
            value={tagInput}
            onChange={handleTagInputChange}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddSuggestedTag(tag)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition"
              >
                #{tag}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {postTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* End Tag Input and Suggested Tags */}

       <div className="flex justify-between mt-2 flex-wrap gap-2">
  <div className="flex gap-2 flex-wrap relative max-w-full">
    <button
      type="button"
      className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition flex items-center gap-2"
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    >
      <LuSmilePlus /> Share Emoji
    </button>
    {showEmojiPicker && (
      <div className="flex gap-1 mt-2  max-w-full flex-wrap overflow-auto max-h-32">
        {emojiList.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className="text-xl"
            onClick={() => handleShareEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    )}
    {selectedEmoji && (
      <span className="ml-2 text-xl">{selectedEmoji}</span>
    )}
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
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      post.name
                    )}&background=random`
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
            {/* Edit/Delete Buttons */}
            {post.userId === userId && (
              <div className="ml-auto flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                  onClick={() => handleEditPost(post)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          {/* Edit Mode */}
          {editingPostId === post._id ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={editPostText}
                onChange={(e) => setEditPostText(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 resize-none text-sm"
                rows="3"
              />
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition flex items-center gap-1"
                  onClick={() => handleEditPostSave(post._id)}
                >
                  <FaCheck /> Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition flex items-center gap-1"
                  onClick={handleEditPostCancel}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-700 text-sm">{post.text}</p>
          )}

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
              className={`flex items-center gap-1 transition ${
                likedPosts[post._id] ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <FaHeart /> {Array.isArray(post.likes) ? post.likes.length : post.likes}
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
            {post.comments.slice().reverse().map((cmt, i) => (
              <div key={cmt._id || i} className="flex flex-col gap-1 pl-2 border-l-2 border-gray-200">
                <div className="flex items-start gap-2">
                  <img
                    src={
                      cmt.imageUrl
                        ? cmt.imageUrl
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            cmt.name
                          )}&background=random`
                    }
                    alt="Commenter"
                    className="w-6 h-6 rounded-full mt-1"
                  />
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{cmt.name}</span>: {cmt.text}
                    </p>
                    <p className="text-xs text-gray-400">
                      {moment(cmt.time).fromNow()}
                    </p>
                    <button
                      className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
                      onClick={() =>
                        setReplyInputs({
                          ...replyInputs,
                          [cmt._id]:
                            replyInputs[cmt._id] === undefined ? "" : undefined,
                        })
                      }
                    >
                      <FaReply className="text-xs" /> Reply
                    </button>
                  </div>
                </div>
                {replyInputs[cmt._id] !== undefined && (
                  <div className="ml-8 mt-2">
                    <input
                      type="text"
                      placeholder="Add a reply..."
                      value={replyInputs[cmt._id] || ""}
                      onChange={(e) =>
                        handleReplyChange(cmt._id, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1 text-sm"
                    />
                    <button
                      onClick={() => handleReplySubmit(post._id, cmt._id)}
                      className="mt-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                    >
                      Reply
                    </button>
                  </div>
                )}
                {cmt.replies && cmt.replies.length > 0 && (
                  <div className="ml-8 mt-2 space-y-1">
                    {cmt.replies.slice().reverse().map((reply, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <img
                          src={
                            reply.imageUrl
                              ? reply.imageUrl
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  reply.name
                                )}&background=random`
                          }
                          alt="Replier"
                          className="w-5 h-5 rounded-full mt-1"
                        />
                        <div>
                          <p className="text-xs">
                            <span className="font-semibold">{reply.name}</span>: {reply.text}
                          </p>
                          <p className="text-xs text-gray-400">
                            {moment(reply.time).fromNow()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item6;