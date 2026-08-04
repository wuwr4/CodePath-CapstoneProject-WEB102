
import supabase from "./client"

import { useEffect, useState } from "react"

import { Link } from "react-router"

const App = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchPosts = async () => {

        const {data, error} = await supabase
                                .from("MoviePosts")
                                .select()
                                .order("created_at", { ascending: false })

        setPosts(data)
    }

    fetchPosts()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    console.log({
      title,
      description,
      imageUrl,
    });

    const {data, error } = await supabase
      .from("MoviePosts")
      .insert({ title: title, description: description, imageURL: imageUrl, numVotes: 0 })

      console.log(error)

    window.location = "/"
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Title *</label>
          <br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="imageUrl">Image URL</label>
          <br />
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <h2>Posts</h2>

    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>Post #{post.id}</h2>
          <h3>Title: {post.title}</h3>
          <h3>Created: {post.created_at}</h3>
          <h3>Votes: {post.numVotes}</h3>
          <Link to={"/posts/" + post.id}> View Post </Link>

        </li>
      ))}
    </ul>

    </div>
  );
};

export default App;