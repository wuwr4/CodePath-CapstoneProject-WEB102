
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../client";

import { Link } from "react-router"

const PostView = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("MoviePosts")
        .select()
        .eq("id", id)

      if (error) {
        console.error(error);
        return;
      }

      console.log(data)

      setPost(data[0]);
    };

    fetchPost();
  }, [id]);

  const handleUpvote = async () => {

    const newVotes = (post.numVotes || 0) + 1;

    const { error } = await supabase
        .from("MoviePosts")
        .update({ numVotes: newVotes })
        .eq("id", id);

    if (error) {
        console.error(error);
        return;
    }

    setPost({
        ...post,
        numVotes: newVotes,
    });
    };

  return (
    <>
        Viewing Post #{id}
      <h1>Title: {post?.title}</h1>
      <h3>Votes: {post?.numVotes}</h3>

      <p>Description: {post?.description}</p>
        
        <br />
    
        <button onClick={handleUpvote}>
         Upvote
        </button>

        <br />

      <Link to="/"> Back to home page </Link>
    </>
  );
};

export default PostView;