import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ status: "", author: "", title: "" });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
        setError(""); // Clear error on success
      } catch (err) {
        setError("Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  const stats = {
    "To Read": books.filter(b => b.status === "To Read").length,
    "Reading": books.filter(b => b.status === "Reading").length,
    "Read": books.filter(b => b.status === "Read").length,
  };

  const filteredBooks = books.filter(book =>
    (filter.status ? book.status === filter.status : true) &&
    (filter.author ? book.author.toLowerCase().includes(filter.author.toLowerCase()) : true) &&
    (filter.title ? book.title.toLowerCase().includes(filter.title.toLowerCase()) : true)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(books.filter(b => b._id !== id));
      } catch {
        alert("Failed to delete book");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-4 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 w-full pt-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 w-full md:w-auto text-lg font-semibold"
          >
            Logout
          </button>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-6 w-full">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6 text-center w-full">
            <div className="text-gray-500 text-base">To Read</div>
            <div className="text-3xl font-bold text-blue-600">{stats["To Read"]}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6 text-center w-full">
            <div className="text-gray-500 text-base">Reading</div>
            <div className="text-3xl font-bold text-yellow-600">{stats["Reading"]}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6 text-center w-full">
            <div className="text-gray-500 text-base">Read</div>
            <div className="text-3xl font-bold text-green-600">{stats["Read"]}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 w-full">
          <Link
            to="/add-book"
            className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 text-lg font-semibold w-full sm:w-auto"
          >
            + Add Book
          </Link>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto text-base"
              value={filter.status}
              onChange={e => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="To Read">To Read</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
            </select>
            <input
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto text-base"
              type="text"
              placeholder="Filter by author"
              value={filter.author}
              onChange={e => setFilter({ ...filter, author: e.target.value })}
            />
            <input
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto text-base"
              type="text"
              placeholder="Filter by title"
              value={filter.title}
              onChange={e => setFilter({ ...filter, title: e.target.value })}
            />
          </div>
        </div>
        {error && books.length === 0 && (
          <div className="text-red-600 mb-4">{error}</div>
        )}
        <div className="flex-1 w-full pb-6">
          {filteredBooks.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No books found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {filteredBooks.map(book => (
                <BookCard key={book._id} book={book} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;