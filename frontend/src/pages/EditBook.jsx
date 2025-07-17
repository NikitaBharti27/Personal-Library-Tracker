import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBook() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books`);
        const book = res.data.find((b) => b._id === id);
        if (book) {
          setForm({
            title: book.title,
            author: book.author,
            genre: book.genre,
            status: book.status,
            cover: null,
          });
        }
      } catch {
        setError("Failed to load book");
      }
    };
    fetchBook();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/books/${id}`, data);
      setSuccess("Book updated!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book");
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Edit Book</h2>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      {success && <div className="mb-2 text-green-500">{success}</div>}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
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
        <button className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;