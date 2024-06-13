import Blogcard from "@scripts/react/components/blog-card";
import Breadcrumbs from "@scripts/react/components/breadcrumbs";
import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
 

const Blog = () => {
const [blogs,setBlogs] = useState([]);
const [recentBlogs,setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${EnvProvider.baseUrl}custom-posts/blog?author=1`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data;
        setBlogs(data1); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  
  useEffect(() => {
    const fetchrecentBlogs = async () => {
      try {
        const response = await fetch(
          `${EnvProvider.baseUrl}custom-posts/blog?meta_key=recent-posts`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data;
        setRecentBlogs(data1); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchrecentBlogs();
  }, []);


  return (
    <div className="blogs-page">
      <div className="container mx-auto section-alt px-4">
        <Breadcrumbs data={[{ name: "Home", url: "/" }, { name: "Blog" }]} />
        <div className="row section">
          <div
            className="d-flex flex-column col-12 col-lg-9"
            style={{ gap: "2.5rem" }}
          >
            {blogs.length > 0 && blogs.map((blog,index) => (
                  <Blogcard
                    image={blog.thumbnail}
                    title={blog.title}
                    slug={blog.slug}
                    description={blog.content}
                    blog={blog}
                />
            ))}
          
            
          </div>
          <div className="d-flex flex-column col-1 gap-4 col-lg-3">
            <h6 className="h6">Recent Blogs</h6>
            <div
              className="d-flex flex-column p1 bg-secondary bg-opacity-5"
              style={{
                padding: "1.25rem",
                gap: "1.75rem",
                borderRadius: "1.25rem",
              }}
            >
              {recentBlogs.length > 0 ? recentBlogs.map((blog) => (
                <a href={`/${blog.slug}`}>{blog.title}</a>
              )) : ''}
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
