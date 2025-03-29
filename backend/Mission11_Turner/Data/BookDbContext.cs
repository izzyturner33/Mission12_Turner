using Microsoft.EntityFrameworkCore;

namespace Mission11_Turner.Data;

// Database context for managing Book entities
public class BookDbContext : DbContext
{
    // Constructor to configure the database context with options
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }

    // DbSet representing the Books table in the database
    public DbSet<Book> Books { get; set; }
}


