import { Link } from "react-router-dom";

function BookCard({ book, onDelete }) {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-xl p-4 w-full h-full">
      {book.cover && (
        <img
          src={/^https?:/.test(book.cover) ? book.cover : `http://localhost:5000${book.cover}`}
          alt="cover"
          className="w-20 h-28 object-cover rounded border mx-auto md:mx-0"
        />
      )}
      <div className="flex-1 flex flex-col w-full">
        <div>
          <div className="font-bold text-lg text-gray-900 mb-1">{book.title}</div>
          <div className="text-gray-700 mb-1">{book.author}</div>
          <div className="text-gray-500 text-sm mb-2">{book.genre}</div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
              book.status === "Read"
                ? "bg-green-100 text-green-700"
                : book.status === "Reading"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {book.status}
          </span>
        </div>
        <div className="flex gap-3 mt-auto pt-4 justify-end">
          <Link
            to={`/edit-book/${book._id}`}
            className="bg-green-400 hover:bg-green-500 text-white text-sm font-medium px-4 py-2 rounded transition shadow"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(book._id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
