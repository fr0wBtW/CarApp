export const getCars = async(token) => {
    const res = await fetch("https://localhost:7150/api/Car", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) throw new Error("Failed to fetch cars");
    return res.json();
};

export const createCar = async(token, car) => {
    const res = await fetch("https://localhost:7150/api/Car", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(car)
    });
    return res.json();
};

export const updateCar = async(token, id, car) => {
    const res = await fetch(`https://localhost:7150/api/Car/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(car)
    });
    return res.json();
};

export const deleteCar = async(token, id) => {
    const res = await fetch(`https://localhost:7150/api/Car/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res.ok;
}