import { useEffect, useState } from "react";
import { getCars, createCar, updateCar, deleteCar } from "../api/cars";

export default function CarList({ token }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newCar, setNewCar] = useState({ make: "", model: "", year: "" });
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars(token);
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [token]);

  const hanldleAddCar = async (e) => {
    e.preventDefault();
    if (!newCar.make || !newCar.model || !newCar.year || isNaN(newCar.year)) {
      alert("Please enter valid car data");
      return;
    }
    try {
      const created = await createCar(token, newCar);
      setCars([...cars, created]);
      setNewCar({ make: "", model: "", year: "" });
    } catch (error) {
      console.log("Error creating car", error);
    }
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    if (!editingCar.make || !editingCar.model || !editingCar.year || isNaN(editingCar.year)) {
      alert("Please enter valid car data");
      return;
    }
    try {
      const updated = await updateCar(token, editingCar.id, editingCar);
      setCars(cars.map((car) => (car.id === updated.id ? updated : car)));
      setEditingCar(null);
    } catch (error) {
      console.error("Error updating car", error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(token, id);
      setCars(cars.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting car", error);
    }
  }

  if (loading) return <p>Loading cars...</p>;

  return (
    <div>
      <h2>Car List</h2>

      <form onSubmit={hanldleAddCar}>
        <input
          type="text"
          placeholder="Make"
          value={newCar.make}
          onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={newCar.year}
          onChange={(e) => setNewCar({ ...newCar, year: e.target.value ? parseInt(e.target.value) : "" })}
          required
          min="1900"
          max="2100"
        />
        <button type="submit">Add Car</button>
      </form>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {editingCar?.id === car.id ? (
              <form onSubmit={handleUpdateCar}>
                <input
                  type="text"
                  value={editingCar.make}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, make: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingCar.model}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, model: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editingCar.year}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, year: e.target.value ? parseInt(e.target.value) : "" })
                  }
                  min="1900"
                  max="2100"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingCar(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {car.make} {car.model} ({car.year})
                <button onClick={() => setEditingCar(car)}>Edit</button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {/* <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} ({car.year})
          </li>
        ))}
      </ul> */}
    </div>
  );
}
