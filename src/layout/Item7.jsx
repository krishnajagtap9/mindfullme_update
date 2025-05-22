import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Tab,
    Tabs,
    Typography,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Card,
    CardMedia,
} from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import {
    FaEdit,
    FaTrash,
    FaHeart,
    FaComment,
    FaBookmark,
    FaReply,
    FaCheck,
    FaTimes,
} from 'react-icons/fa';

const API_URL = "https://mindfullme-update-q1z8.onrender.com/api/posts";


const Item7 = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const userName = user?.fullName || "Anonymous User";
    const userId = user?.id;

    const [tabValue, setTabValue] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [editingPostId, setEditingPostId] = useState(null);
    const [editPostText, setEditPostText] = useState("");
    const [commentInputs, setCommentInputs] = useState({});
    const [replyInputs, setReplyInputs] = useState({});

    // Fetch only posts belonging to the logged-in user
    const fetchUserPosts = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await axios.get(`${API_URL}?userId=${userId}`);
            // Extra frontend filter for safety
            const postsData = (response.data || []).filter(post => post.userId === userId);
            setUserPosts(postsData);

            const initialLikedPosts = {};
            postsData.forEach((post) => {
                if (Array.isArray(post.likes) && post.likes.includes(userId)) {
                    initialLikedPosts[post._id] = true;
                }
            });
            setLikedPosts(initialLikedPosts);
        } catch (error) {
            console.error("Error fetching user posts:", error);
            setUserPosts([]);
        }
    }, [userId]);

    const fetchSavedPosts = useCallback(async () => {
        if (!userId) return;
        try {
            setSavedPosts([]);
        } catch (error) {
            console.error("Error fetching saved posts:", error);
            setSavedPosts([]);
        }
    }, [userId]);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            if (tabValue === 0) {
                fetchUserPosts();
            } else if (tabValue === 1) {
                fetchSavedPosts();
            }
        }
    }, [isLoaded, isSignedIn, tabValue, fetchUserPosts, fetchSavedPosts]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleEditPost = (post) => {
        setEditingPostId(post._id);
        setEditPostText(post.text);
    };

    const handleEditPostSave = async (postId) => {
        if (!editPostText.trim()) return;
        try {
            const res = await axios.patch(`${API_URL}/${postId}`, {
                text: editPostText,
                userId: userId,
            });
            setUserPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? res.data : post))
            );
            setEditingPostId(null);
            setEditPostText("");
        } catch (err) {
            console.error("Error editing post:", err);
            alert("Failed to edit post. Please try again.");
        }
    };

    const handleEditPostCancel = () => {
        setEditingPostId(null);
        setEditPostText("");
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await axios.delete(`${API_URL}/${postId}`, { data: { userId: userId } });
            setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete post. Please try again.");
        }
    };

    const handleLike = async (postId) => {
        if (!userId) {
            alert("Please log in to like posts.");
            return;
        }
        try {
            const res = await axios.patch(`${API_URL}/${postId}/like`, { userId });
            setUserPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? res.data : post))
            );
            setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
        } catch (err) {
            console.error("Error liking post:", err);
            alert("Failed to like/unlike post. Please try again.");
        }
    };

    const handleCommentChange = (postId, value) => {
        setCommentInputs((prev) => ({ ...prev, [postId]: value }));
    };

    const handleCommentSubmit = async (postId) => {
        const commentText = commentInputs[postId];
        if (!commentText || !commentText.trim()) return;
        if (!userId) {
            alert("Please log in to comment.");
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/${postId}/comments`, {
                userId,
                name: userName,
                imageUrl: user.imageUrl,
                text: commentText,
            });
            setUserPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? res.data : post))
            );
            setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        } catch (err) {
            console.error("Error submitting comment:", err);
            alert("Failed to add comment. Please try again.");
        }
    };

    const handleReplyChange = (commentId, value) => {
        setReplyInputs((prev) => ({ ...prev, [commentId]: value }));
    };

    const handleReplySubmit = async (postId, commentId) => {
        const replyText = replyInputs[commentId];
        if (!replyText || !replyText.trim()) return;
        if (!userId) {
            alert("Please log in to reply.");
            return;
        }
        try {
            const res = await axios.post(
                `${API_URL}/${postId}/comments/${commentId}/replies`,
                {
                    userId,
                    name: userName,
                    imageUrl: user.imageUrl,
                    text: replyText,
                }
            );
            setUserPosts((prevPosts) =>
                prevPosts.map((post) => (post._id === postId ? res.data : post))
            );
            setReplyInputs((prev) => ({ ...prev, [commentId]: undefined }));
        } catch (err) {
            console.error("Error submitting reply:", err);
            alert("Failed to add reply. Please try again.");
        }
    };

    if (!isLoaded) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isSignedIn) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                Please sign in to view your profile and posts.
            </Container>
        );
    }



    // Extra frontend filter for safety (even if backend already filters)
    const filteredUserPosts = userPosts.filter(post => post.userId === userId);

    return (
        <Container maxWidth="md" sx={{ mt: 4, width: '100%' }}>
            {/* Profile Header */}
            <Box display="flex" alignItems="center" mb={4}>
                <Avatar
                    src={user.imageUrl}
                    alt={user.fullName}
                    sx={{ width: 96, height: 96, mr: 4 }}
                />
                <Box>
                    <Typography variant="h5" fontWeight={600}>
                        {userName}
                    </Typography>
                    <Typography color="textSecondary">
                        {user.primaryEmailAddress?.emailAddress}
                    </Typography>
                    <Box display="flex" gap={4} mt={1}>
                        <Typography>
                            <strong>{filteredUserPosts.length}</strong> posts
                        </Typography>
                        <Typography>
                            <strong>{savedPosts.length}</strong> Saved post
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Tabs for Posts and Saved */}
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{ mb: 3 }}
            >
                <Tab label="Posts" />
                <Tab label="Saved" />
            </Tabs>

            {/* Tab Content */}
            {tabValue === 0 && (
                <div className="flex flex-col gap-4">
                    {filteredUserPosts.length > 0 ? (
                        filteredUserPosts.map((post) => (
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
                                <div className="flex gap-5 text-sm text-gray-600 mt-3">
                                    <button
                                        onClick={() => handleLike(post._id)}
                                        className={`flex items-center gap-1 transition ${likedPosts[post._id] ? "text-red-500" : "hover:text-red-500"
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
                                <div className="mt-3 space-y-2">
                                    {post.comments &&
                                        post.comments.slice().reverse().map((cmt, i) => (
                                            <div
                                                key={cmt._id || i}
                                                className="flex flex-col gap-1 pl-2 border-l-2 border-gray-200"
                                            >
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
                                                            <span className="font-semibold">{cmt.name}</span>:{" "}
                                                            {cmt.text}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {moment(cmt.time).fromNow()}
                                                        </p>
                                                        <button
                                                            className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
                                                            onClick={() =>
                                                                setReplyInputs({
                                                                    ...replyInputs,
                                                                    [cmt._id]: replyInputs[cmt._id] === undefined ? "" : undefined,
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
                                                        {cmt.replies
                                                            .slice()
                                                            .reverse()
                                                            .map((reply, j) => (
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
                                                                            <span className="font-semibold">
                                                                                {reply.name}
                                                                            </span>
                                                                            : {reply.text}
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
                        ))
                    ) : (
                        <Typography color="textSecondary" textAlign="center" width="100%">
                            You haven't made any posts yet.
                        </Typography>
                    )}
                </div>
            )}

            {tabValue === 1 && (
                <Grid container spacing={2}>
                    {savedPosts.length > 0 ? (
                        savedPosts.map((post, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card>
                                    {post.imageUrl && (
                                        <CardMedia
                                            component="img"
                                            image={post.imageUrl}
                                            alt="Saved Post"
                                            height="200"
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    )}
                                    <Box p={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.text.substring(0, 100)}...
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" mt={1}>
                                            By {post.name} - {moment(post.createdAt).fromNow()}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography color="textSecondary" textAlign="center" width="100%">
                            No saved posts.
                        </Typography>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default Item7;