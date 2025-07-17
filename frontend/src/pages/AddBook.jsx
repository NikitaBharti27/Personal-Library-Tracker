import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "To Read",
    cover: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setForm({ ...form, cover: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = new FormData();
    data.append("title", form.title);
    data.append("author", form.author);
    data.append("genre", form.genre);
    data.append("status", form.status);
    if (form.cover) data.append("cover", form.cover);

    try {
      await axios.post("http://localhost:5000/api/books", data);
      setSuccess("Book added!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col flex-1 w-full max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between w-full mt-8 mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Add a Book</h2>
          <Link to="/search" className="px-4 py-2 ml-4 text-white transition bg-indigo-600 rounded shadow hover:bg-indigo-700">
            Search Book
          </Link>
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        {success && <div className="mb-2 text-green-500">{success}</div>}
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 mx-auto bg-white rounded shadow-md">
          <input
            className="w-full p-2 mb-2 border rounded"
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            type="text"
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
            required
          />
          <select
            className="w-full p-2 mb-2 border rounded"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="To Read">To Read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
          <input
            className="w-full p-2 mb-4 border rounded"
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleChange}
          />
          <button className="w-full p-2 text-white bg-black rounded hover:bg-gray-800" type="submit">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;