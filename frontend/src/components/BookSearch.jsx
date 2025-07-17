import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    setResults([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.items) {
        setResults(data.items);
      } else {
        setResults([]);
        setError("No results found.");
      }
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (item) => {
    setError("");
    setSuccess("");
    if (!user || !user.token) {
      setError("You must be logged in to add books.");
      return;
    }
    const info = item.volumeInfo;
    try {
      await axios.post(
        "http://localhost:5000/api/books",
        {
          title: info.title || "Untitled",
          author: info.authors ? info.authors.join(", ") : "Unknown Author",
          genre: info.categories ? info.categories[0] : "Unknown",
          status: "To Read",
          cover: info.imageLinks?.thumbnail || undefined
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      setSuccess(`Added '${info.title}' to your library!`);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add book. (Maybe already added?)"
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {results.map((item) => {
          const info = item.volumeInfo;
          return (
            <div key={item.id} className="bg-white rounded shadow p-4 flex gap-4 items-center">
              {info.imageLinks?.thumbnail && (
                <img
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  className="w-20 h-28 object-cover rounded border"
                />
              )}
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-900 mb-1">{info.title}</div>
                <div className="text-gray-700 mb-1">
                  {info.authors ? info.authors.join(", ") : "Unknown Author"}
                </div>
                <button
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  onClick={() => handleAddBook(item)}
                  disabled={!user}
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookSearch; 