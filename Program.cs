List<City> cities = new List<City>
{
    new City { Id = 1, Name = "New York" },
    new City { Id = 2, Name = "Los Angeles" },
    new City { Id = 3, Name = "Chicago" },
    new City { Id = 4, Name = "Houston" },
    new City { Id = 5, Name = "Phoenix" }
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Alice" },
    new Walker { Id = 2, Name = "Bob" },
    new Walker { Id = 3, Name = "Charlie" },
    new Walker { Id = 4, Name = "Diana" },
    new Walker { Id = 5, Name = "Evan" }
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Buddy", WalkerId = 1, CityId = 1 },
    new Dog { Id = 2, Name = "Bella", WalkerId = 2, CityId = 2 },
    new Dog { Id = 3, Name = "Charlie", WalkerId = 3, CityId = 1 },
    new Dog { Id = 4, Name = "Lucy", WalkerId = 4, CityId = 3 },
    new Dog { Id = 5, Name = "Max", WalkerId = 1, CityId = 2 },
    new Dog { Id = 6, Name = "Daisy", WalkerId = 5, CityId = 3 },
    new Dog { Id = 7, Name = "Rocky", WalkerId = 3, CityId = 4 },
    new Dog { Id = 8, Name = "Luna", WalkerId = 2, CityId = 5 },
    new Dog { Id = 9, Name = "Jack", WalkerId = 4, CityId = 4 },
    new Dog { Id = 10, Name = "Sadie", WalkerId = 5, CityId = 5 }
};

List<CityWalker> cityWalkers = new List<CityWalker>
{
    new CityWalker { Id = 1, WalkerId = 1, CityId = 1 },
    new CityWalker { Id = 2, WalkerId = 2, CityId = 1 },
    new CityWalker { Id = 3, WalkerId = 1, CityId = 2 },
    new CityWalker { Id = 4, WalkerId = 3, CityId = 2 },
    new CityWalker { Id = 5, WalkerId = 2, CityId = 3 },
    new CityWalker { Id = 6, WalkerId = 4, CityId = 3 },
    new CityWalker { Id = 7, WalkerId = 3, CityId = 4 },
    new CityWalker { Id = 8, WalkerId = 5, CityId = 4 },
    new CityWalker { Id = 9, WalkerId = 4, CityId = 5 },
    new CityWalker { Id = 10, WalkerId = 5, CityId = 5 }
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
});

app.MapGet("/api/walkers", () =>
{
    return walkers.Select(d => new WalkerDTO
    {
        Id = d.Id,
        Name = d.Name
    });
});

app.MapGet("/api/cities", () =>
{
    return cities.Select(d => new CityDTO
    {
        Id = d.Id,
        Name = d.Name
    });
});

app.MapGet("/api/cityWalkers", () =>
{
    return cityWalkers.Select(d => new CityWalkerDTO
    {
        Id = d.Id,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
});

app.MapPost("/api/dogs", (Dog dog) =>
{
    dog.Id = dogs.Count > 0 ? dogs.Max(d => d.Id) + 1 : 1;
    dogs.Add(dog);

    return Results.Created($"/api/dogs/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        CityId = dog.CityId
    });
});

app.MapDelete("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);

    dogs.Remove(dog);

    return Results.NoContent();

});

app.Run();
