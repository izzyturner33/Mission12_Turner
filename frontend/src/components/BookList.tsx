import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // State variables for managing book data and pagination
  const [books, setBooks] = useState<Book[]>([]); // Stores the books retrieved from the API
  const [pageSize, setPageSize] = useState<number>(5); // Number of books per page
  const [pageNum, setPageNum] = useState<number>(1); // Current page number
  const [totalItems, setTotalItems] = useState<number>(0); // Total number of books in the database
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages based on `totalItems`
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting order (ascending or descending)
  const navigate = useNavigate();

  // Sorting books on the frontend based on title
  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title); // Sort in ascending order (A-Z)
    } else {
      return b.title.localeCompare(a.title); // Sort in descending order (Z-A)
    }
  });

  // Fetch books from the API whenever pageSize, pageNum, or sortOrder changes
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `http://localhost:4001/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}`,
      );
      const data = await response.json();

      setBooks(data.books); // Store the fetched books in state
      setTotalItems(data.totalNumBooks); // Set the total number of books
      setTotalPages(Math.ceil(totalItems / pageSize)); // Calculate total pages
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]); // Re-run fetchBooks when these values change

  return (
    <>
      {/* Render sorted books */}
      {sortedBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {b.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/purchase/${b.title}/${b.bookId}/${b.price}`)
              }
            >
              Purchase
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/* Page number buttons */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1} // Disable the button for the current page
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      {/* Sorting Button */}
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Title {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
      </button>

      <br />

      {/* Results per page dropdown */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(b) => {
            setPageSize(Number(b.target.value)); // Update page size
            setPageNum(1); // Reset to the first page
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
