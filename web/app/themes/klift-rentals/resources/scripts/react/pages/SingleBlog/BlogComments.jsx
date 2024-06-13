import Blogcard from '@scripts/react/components/blog-card';
import Breadcrumbs from '@scripts/react/components/breadcrumbs';
import { useEffect, useState } from 'react';
import EnvProvider from '@scripts/react/EnvVar';
import BlogComment from '@scripts/react/components/BlogComment';

const BlogComments = ({ comments,setComment,handleSubmit,cmt,commentCounts,loadMoreComments }) => {
   const [commentId,setCommentId] = useState(0);
  return (
    <div className="comments px-4">
      <div className="d-flex flex-column gap-3">
        {comments.length > 0 &&
          comments.map((comment, indexs) => (
            <div className='d-flex gap-4'>
              <img
                src={comment?.['author']?.picture}
                alt=""
                className="rounded-circle"
                style={{width: "1.5rem", height:"1.5rem"}}
              />

              <div className='flex-grow-1'>
                <h4>{comment?.['author']?.name}</h4>
                {comment.content}
                <p>{comment.date} <button onClick={() => setCommentId(comment.id)}>Reply</button></p>

                <BlogComment 
                comment={cmt} 
                setComment={setComment} 
                parent={comment.id} 
                setCommentId={() => setCommentId}
                handleSubmit={() => handleSubmit(comment.id)} 

                readMore={comment.id === commentId}/>

                 {comment.replies.length > 0 && comment.replies.map((reply,index) => (
                    <div className='d-flex mt-3 gap-4'>
                        <img
                            src={reply?.['author']?.picture}
                            alt=""
                            className="rounded-circle"
                            style={{width: "1.5rem", height:"1.5rem"}}
                        />
                        <div className='flex-grow-1'>
                            <h4>{reply?.['author']?.name}</h4>
                            {reply.content}
                            <p>{reply.date}</p>
                        </div>
                    </div>
                 ))}
              </div>

            </div>
          ))}

          {
            comments?.length < commentCounts ? (
                <>
                   <button onClick={()=>loadMoreComments()}>Show More Comments</button>
                </>
            ):(
                 <></>
            )
          }
      </div>
    </div>
  );
};

export default BlogComments;
