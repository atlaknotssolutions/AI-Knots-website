


// import React, { useEffect, useState, useRef } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import DOMPurify from "dompurify";
// import { useTheme } from "../context/ThemeContext";

// import {
//   fetchSinglePost,
//   incrementPostView,
//   togglePostLike,
//   sendCommentOtp,
//   postCommentWithOtp,
// } from "./technologyslice/technologySlice";

// const TechnologyDetail = () => {
//   const { slug } = useParams();           // ← Changed from id to slug
//   const dispatch = useDispatch();
//   const { isDark } = useTheme();

//   const { newsItems, loading, error } = useSelector((state) => state.technology);

//   const [post, setPost] = useState(null);
//   const hasIncrementedView = useRef(false);

//   // Comment Form States
//   const [commentText, setCommentText] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch Post
//   useEffect(() => {
//     if (!slug) return;

//     const existingPost = newsItems.find((item) => item.slug === slug);

//     if (existingPost) {
//       setPost(existingPost);
//     } else {
//       dispatch(fetchSinglePost(slug));
//     }
//   }, [slug, newsItems, dispatch]);

//   // Increment View ONLY ONCE
//   useEffect(() => {
//     if (slug && post && !hasIncrementedView.current) {
//       dispatch(incrementPostView(slug));
//       hasIncrementedView.current = true;
//     }
//   }, [slug, post, dispatch]);

//   // Update post when Redux state changes
//   useEffect(() => {
//     if (!slug) return;
//     const updatedPost = newsItems.find((item) => item.slug === slug);
//     if (updatedPost) setPost(updatedPost);
//   }, [newsItems, slug]);

//   if (loading && !post) return <div className="text-center py-20 text-xl">Loading...</div>;

//   if (error || !post) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50"}`}>
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
//           <Link to="/technology" className="text-red-600 hover:underline">← Back to Technology</Link>
//         </div>
//       </div>
//     );
//   }

//   const sanitizedContent = DOMPurify.sanitize(post.description || "");

//   const handleLike = () => dispatch(togglePostLike({ slug, email: email || "guest@example.com" }));

//   const handleSendOtp = async () => {
//     if (!name || !email || !phone) return alert("All fields are required");
//     setIsSubmitting(true);
//     await dispatch(sendCommentOtp({ slug, name, email, phone }));
//     setShowOtpInput(true);
//     setIsSubmitting(false);
//   };

//   const handlePostComment = async () => {
//     if (!otp || !commentText.trim()) return alert("OTP and comment are required");
//     setIsSubmitting(true);

//     const result = await dispatch(
//       postCommentWithOtp({ slug, email, otp, comment: commentText })
//     );

//     if (!result.error) {
//       setCommentText("");
//       setOtp("");
//       setShowOtpInput(false);
//       alert("✅ Comment posted successfully!");
//     } else {
//       alert("Failed to post comment");
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div className={`min-h-screen mt-10 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}>
//       {/* Hero Image Section */}
//       <div className="relative h-96 md:h-[500px] overflow-hidden">
//         {post.image && (
//           <img 
//             src={post.image} 
//             alt={post.title} 
//             className="w-full h-full object-cover" 
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{post.title}</h1>
//           <div className="flex items-center gap-4 text-lg text-gray-300">
//             <span>{post.date}</span>
//             <span>•</span>
//             <span>By {post.author}</span>
//           </div>
//         </div>
//       </div>

//       <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
//         <div
//           dangerouslySetInnerHTML={{ __html: sanitizedContent }}
//           className={`prose max-w-none text-lg leading-relaxed ${isDark ? "prose-invert text-gray-300" : "text-gray-700"}`}
//         />

//         {/* Like Button */}
//         <div className="flex justify-end mt-8">
//           <button
//             onClick={handleLike}
//             className="flex items-center gap-2 text-red-600 hover:text-red-700 text-xl font-medium"
//           >
//             ❤️ {post.likes || 0}
//           </button>
//         </div>

//         {/* Comments Section */}
//         <div className="mt-16">
//           <h2 className="text-3xl font-bold mb-8">
//             Comments ({post.comments?.length || 0})
//           </h2>

//           <div className="space-y-8 mb-12">
//             {post.comments?.length > 0 ? (
//               post.comments.map((comment, index) => (
//                 <div
//                   key={index}
//                   className={`p-6 rounded-2xl ${isDark ? "bg-zinc-900" : "bg-gray-100"}`}
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-bold">
//                       {(comment.name || comment.email || "U")[0].toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="font-semibold">
//                         {comment.name || "Anonymous"}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {comment.createdAt 
//                           ? new Date(comment.createdAt).toLocaleDateString() 
//                           : "Just now"}
//                       </p>
//                     </div>
//                   </div>
//                   <p className={isDark ? "text-gray-300" : "text-gray-700"}>
//                     {comment.comment}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 py-12">No comments yet. Be the first!</p>
//             )}
//           </div>

//           {/* Comment Form */}
//           <div className={`p-8 rounded-2xl ${isDark ? "bg-zinc-900" : "bg-gray-50"}`}>
//             <h3 className="text-2xl font-semibold mb-6">Leave a Comment</h3>

//             {!showOtpInput ? (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className={`w-full p-4 rounded-xl mb-4 ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"} border`}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`w-full p-4 rounded-xl mb-4 ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"} border`}
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className={`w-full p-4 rounded-xl mb-6 ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"} border`}
//                 />
//                 <button
//                   onClick={handleSendOtp}
//                   disabled={isSubmitting}
//                   className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-white font-semibold disabled:opacity-70"
//                 >
//                   {isSubmitting ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   maxLength={6}
//                   className={`w-full p-4 rounded-xl mb-4 text-center text-2xl tracking-widest ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"} border`}
//                 />
//                 <textarea
//                   placeholder="Write your comment..."
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   rows={4}
//                   className={`w-full p-4 rounded-xl mb-4 ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"} border`}
//                 />
//                 <button
//                   onClick={handlePostComment}
//                   disabled={isSubmitting}
//                   className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold disabled:opacity-70"
//                 >
//                   {isSubmitting ? "Posting..." : "Post Comment"}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TechnologyDetail;


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
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const { newsItems, loading, error } = useSelector((state) => state.technology);

  const [post, setPost] = useState(null);
  const hasIncrementedView = useRef(false);

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
    if (!slug) return;

    const existingPost = newsItems.find((item) => item.slug === slug);
    if (existingPost) {
      setPost(existingPost);
    } else {
      dispatch(fetchSinglePost(slug));
    }
  }, [slug, dispatch]);

  // Increment View (once)
  useEffect(() => {
    if (slug && post && !hasIncrementedView.current) {
      dispatch(incrementPostView(slug));
      hasIncrementedView.current = true;
    }
  }, [slug, post, dispatch]);

  // Sync with Redux updates
  useEffect(() => {
    if (!slug) return;
    const updatedPost = newsItems.find((item) => item.slug === slug);
    if (updatedPost) setPost(updatedPost);
  }, [newsItems, slug]);

  if (loading && !post) return <div className="text-center py-20 text-xl">Loading post...</div>;

  if (error || !post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50"}`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/technology" className="text-red-600 hover:underline">← Back to Technology</Link>
        </div>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.description || "");

  const handleLike = () => {
    dispatch(togglePostLike({ slug, email: email || undefined }));
  };

  const handleSendOtp = async () => {
    if (!name || !email || !phone) return alert("All fields are required");
    setIsSubmitting(true);
    const result = await dispatch(sendCommentOtp({ slug, name, email, phone }));
    setIsSubmitting(false);
    if (!result.error) {
      setShowOtpInput(true);
    }
  };

  const handlePostComment = async () => {
    if (!otp || !commentText.trim()) return alert("OTP and comment are required");
    setIsSubmitting(true);

    const result = await dispatch(
      postCommentWithOtp({ slug, email, otp, comment: commentText })
    );

    setIsSubmitting(false);
    if (!result.error) {
      setCommentText("");
      setOtp("");
      setShowOtpInput(false);
      alert("✅ Comment posted successfully!");
    } else {
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen mt-10 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
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

        {/* Like Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-xl font-medium transition-colors"
          >
            ❤️ {post.likes || 0}
          </button>
        </div>

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
                      {(comment.name || comment.email || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{comment.name || "Anonymous"}</p>
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

          {/* Comment Form */}
          <div className={`p-8 rounded-2xl ${isDark ? "bg-zinc-900" : "bg-gray-50"}`}>
            <h3 className="text-2xl font-semibold mb-6">Leave a Comment</h3>

            {!showOtpInput ? (
              <>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-4 rounded-xl mb-4 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`} />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full p-4 rounded-xl mb-4 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`} />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full p-4 rounded-xl mb-6 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`} />
                <button onClick={handleSendOtp} disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-white font-semibold disabled:opacity-70">
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className={`w-full p-4 rounded-xl mb-4 text-center text-2xl tracking-widest border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`} />
                <textarea placeholder="Write your comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} rows={4} className={`w-full p-4 rounded-xl mb-4 border ${isDark ? "bg-black border-gray-700" : "bg-white border-gray-300"}`} />
                <button onClick={handlePostComment} disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold disabled:opacity-70">
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechnologyDetail;