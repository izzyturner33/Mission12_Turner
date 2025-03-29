using System.ComponentModel.DataAnnotations;

namespace Mission11_Turner.Data;

// Represents the Book entity for the database
public class Book
{
    [Key] // Specifies that BookId is the primary key
    public int BookId { get; set; }

    [Required] // Ensures that Title is not null or empty
    public string Title { get; set; }

    [Required] // Ensures that Author is not null or empty
    public string Author { get; set; }

    [Required] // Ensures that Publisher is not null or empty
    public string Publisher { get; set; }

    [Required] // Ensures that ISBN is not null or empty
    public string ISBN { get; set; }

    [Required] // Ensures that Classification is not null or empty
    public string Classification { get; set; }

    [Required] // Ensures that Category is not null or empty
    public string Category { get; set; }

    [Required] // Ensures that PageCount is not null
    public int PageCount { get; set; }

    [Required] // Ensures that Price is not null
    public decimal Price { get; set; }
}