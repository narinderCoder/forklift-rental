import Blogcard from "@scripts/react/components/blog-card";
import Breadcrumbs from "@scripts/react/components/breadcrumbs";
import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import BlogComments from "./BlogComments";
import axios from 'axios';
const SingleBlog = () => {
const [blogs,setBlogs] = useState([]);
const [blog,setBlog] = useState([]); 
const [blogID,setBlogID] = useState(0); 
const [parentComment, setParentComment] = useState("")
const [comment, setComment] = useState("")
const [comments,setComments] = useState([]);
const [commentCounts,setCommentCounts] = useState(0);  
const [loadComment,setLoadComment] = useState(10); 

const [loading,setLoading] = useState(false);

const handleSubmit = async (parent_comment) => {
  try {
    handleLoading(true);
    let cmt = parent_comment == 0 ? parentComment : comment;
    var divElement = document.getElementById('blogDetailReact');
    if (divElement) { 
      let $_ID = parseInt(divElement.getAttribute('data-check')); 
      let $email = parseInt(divElement.getAttribute('data-email')); 
         if($_ID > 0){
             if(cmt !== ''){
              const response = await axios.post(`${EnvProvider.baseUrl}custom-form-submission/post-comment`, {
                parent_comment:parent_comment,
                content:cmt,
                post_id:blog.id,
                id:$_ID,
                email:$email
              });
              setComment('');
              setParentComment('');
              fetchData();
             }else{
              alert('Enter comment first');
             }
              
        }else{
          alert('please login first');
        }
      }
          handleLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    handleLoading(false);
  }
}
  useEffect(() => {   
        fetchData();  
  }, []);

  const fetchData = async (loadComments=null) => {
    try {
      let p = loadComments !== null ? loadComments : loadComment;
      var divElement = document.getElementById('blogDetailReact');  
      let slug = divElement.getAttribute('data-slug');  
      const response = await fetch(
        `${EnvProvider.baseUrl}custom-posts/blog?meta_key=post-detail&slug=${slug}&loadComment=${p}`
      );
      const jsonData = await response.json();
      const data1 = jsonData.data.post;
      setBlog(data1);
      const comments = jsonData.data.comments;
      
      setCommentCounts(jsonData.data.post?.comment_count);
      setComments(comments);  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMoreComments = () =>{
     let t = comments.length + 10;
     setLoadComment(t);
     console.log(t);
     fetchData(t);  
  }

  const handleLoading = (e) => setLoading(e);
  return (
    <div className="single-blog-page">
      <div className="container mx-auto section px-4">
        <Breadcrumbs
          data={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blogs" },
            { name: blog?.title },
          ]}
        />
        
        <div className="w-100 section">
           
          {blog.title != undefined && (
              <Blogcard
              image={blog?.image}
              comment={comment}
              setComment={setComment}
              title={blog?.title}
              slug={blog?.slug}
              description={blog?.content}
              readMore={true}
              blog={blog}
              comments={comments}
              handleSubmit={handleSubmit}
              parentComment={parentComment}
              setParentComment={setParentComment}
              loadMoreComments={() => loadMoreComments()} 
              commentCounts={commentCounts}
              />
          )}

            {/* {comments.length > 0 && (
                <BlogComments loadMoreComments={() => loadMoreComments()} commentCounts={commentCounts} comments={comments} cmt={comment} setComment={setComment} handleSubmit={handleSubmit}/>
            )}     */}


        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
