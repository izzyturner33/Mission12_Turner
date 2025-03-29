using Microsoft.AspNetCore.Mvc;
using Mission11_Turner.Data;

namespace Mission11_Turner.Controllers;

[Route("api/[controller]")] // Defines the base route for this controller
[ApiController] // Marks this class as an API controller
public class BookController : ControllerBase
{
    private BookDbContext _bookContext; // Database context for accessing books

    // Constructor injecting the database context
    public BookController(BookDbContext temp) => _bookContext = temp;

    [HttpGet("AllBooks")] // Defines an API endpoint at "api/Book/AllBooks"
    public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
    {
        var query = _bookContext.Books.AsQueryable();

        if (bookTypes is not null && bookTypes.Any())
        {
            query = query.Where(b => bookTypes.Contains(b.Category));
        }
        
        //var booksQuery = query; // Retrieves books from the database

        // Apply sorting before pagination
        //booksQuery = sortOrder.ToLower() == "asc"
            //? booksQuery.OrderBy(b => b.Title)
            //: booksQuery.OrderByDescending(b => b.Title);

        // Apply pagination after sorting
        var paginatedBooks = query
            .Skip((pageNum - 1) * pageHowMany) // Skips records based on page number
            .Take(pageHowMany) // Retrieves only the requested number of books per page
            .ToList();

        var totalNumBooks = query.Count(); // Gets the total count of books

        // Returns the paginated and sorted book list along with total book count
        return Ok(new
        {
            Books = paginatedBooks,
            TotalNumBooks = totalNumBooks
        });
    }

    [HttpGet("GetBookTypes")]
    public IActionResult GetBookTypes()
    {
        var bookTypes = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        return Ok(bookTypes);
    }
}