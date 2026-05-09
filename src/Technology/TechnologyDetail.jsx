

import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { useTheme } from "../context/ThemeContext";

import {
  fetchSinglePost,
  incrementPostView,
  togglePostLike,
  sendCommentOtp,
  postCommentWithOtp,
} from "./technologyslice/technologySlice";

const TechnologyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  const { newsItems, loading, error } = useSelector((state) => state.technology);

  const [post, setPost] = useState(null);
  const hasIncrementedView = useRef(false);   // ← Fix for multiple view calls

  // Comment Form States
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Post
  useEffect(() => {
    const existingPost = newsItems.find(
      (item) => item._id === id || item.id === id
    );

    if (existingPost) {
      setPost(existingPost);
    } else {
      dispatch(fetchSinglePost(id));
    }
  }, [id, newsItems, dispatch]);

  // Increment View ONLY ONCE
  useEffect(() => {
    if (id && post && !hasIncrementedView.current) {
      dispatch(incrementPostView(id));
      hasIncrementedView.current = true;
    }
  }, [id, post, dispatch]);

  // Update post when Redux changes
  useEffect(() => {
    const updatedPost = newsItems.find(
      (item) => item._id === id || item.id === id
    );
    if (updatedPost) setPost(updatedPost);
  }, [newsItems, id]);

  if (loading && !post) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error || !post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50"}`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/technology" className="text-red-600 hover:underline">← Back</Link>
        </div>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.description || "");

  const handleLike = () => dispatch(togglePostLike(id));

  const handleSendOtp = async () => {
    if (!name || !email || !phone) return alert("All fields are required");
    setIsSubmitting(true);
    await dispatch(sendCommentOtp({ postId: id, name, email, phone }));
    setShowOtpInput(true);
    setIsSubmitting(false);
  };

  const handlePostComment = async () => {
    if (!otp || !commentText.trim()) return alert("OTP and comment required");
    setIsSubmitting(true);

    const result = await dispatch(
      postCommentWithOtp({ postId: id, email, otp, comment: commentText })
    );

    if (!result.error) {
      setCommentText("");
      setOtp("");
      setShowOtpInput(false);
      alert("Comment posted successfully!");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen mt-10 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      {/* Hero */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-lg text-gray-300">
            <span>{post.date}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          className={`prose max-w-none text-lg leading-relaxed ${isDark ? "prose-invert text-gray-300" : "text-gray-700"}`}
        />

     

        {/* Comments Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Comments ({post.comments?.length || 0})
          </h2>

          <div className="space-y-8 mb-12">
            {post.comments?.length > 0 ? (
              post.comments.map((comment, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${isDark ? "bg-zinc-900" : "bg-gray-100"}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {(comment?.email || comment.email?.name || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {comment.user || comment.user?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}
                      </p>
                    </div>
                  </div>
                  <p className={isDark ? "text-gray-300" : "text-gray-700"}>{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-12">No comments yet. Be the first!</p>
            )}
          </div>

        
        </div>
      </main>
    </div>
  );
};

export default TechnologyDetail;