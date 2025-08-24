using CarApi.Data;
using CarApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using CarApi.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace CarApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cars = await _context.Cars.ToListAsync();
            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if(car == null) return NotFound();
            return Ok(car);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CarCreateDto carDto)
        {
            var car = new Car
            {
                Make = carDto.Make,
                Model = carDto.Model,
                Year = carDto.Year
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = car.Id }, car);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CarUpdateDto carDto)
        {
            var car = await _context.Cars.FindAsync(id);
            if(car == null) return NotFound();

            car.Make = carDto.Make;
            car.Model = carDto.Model;
            car.Year = carDto.Year;

            await _context.SaveChangesAsync();
            return Ok(car);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
