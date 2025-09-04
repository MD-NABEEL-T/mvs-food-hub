// CookHome.jsx
import React, { useState } from "react";

export default function CookHome() {
  const [cook, setCook] = useState({
    name: "Chef John Doe",
    rating: 4.8,
    dishes: [
      {
        id: 1,
        name: "Chicken Biryani",
        description: "Spicy Hyderabadi biryani",
        price: 300,
        stock: 10,
        image: "https://via.placeholder.com/150?text=Chicken+Biryani",
      },
      {
        id: 2,
        name: "Paneer Butter Masala",
        description: "Creamy curry with paneer",
        price: 250,
        stock: 5,
        image: "https://via.placeholder.com/150?text=Paneer+Masala",
      },
    ],
  });

  const [editingDish, setEditingDish] = useState(null);
  const [newDish, setNewDish] = useState(null);

  // Delete dish
  const handleDelete = (id) => {
    setCook((prev) => ({
      ...prev,
      dishes: prev.dishes.filter((d) => d.id !== id),
    }));
  };

  // Save edited dish
  const handleEditSave = () => {
    setCook((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) =>
        d.id === editingDish.id ? editingDish : d
      ),
    }));
    setEditingDish(null);
  };

  // Save new dish
  const handleAddSave = () => {
    setCook((prev) => ({
      ...prev,
      dishes: [
        ...prev.dishes,
        { ...newDish, id: Date.now(), image: newDish.image || "https://via.placeholder.com/150" },
      ],
    }));
    setNewDish(null);
  };

  return (
    <div className="homepage" style={{ padding: "20px" }}>
      {/* Profile */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2>{cook.name}</h2>
        <p>⭐ {cook.rating}</p>
        <button className="search-action">Edit Profile</button>
      </div>

      {/* My Dishes */}
      <h3>My Dishes</h3>
      <div className="grid grid-dishes">
        {cook.dishes.map((dish) => (
          <article key={dish.id} className="card dish-card">
            <img
              src={dish.image}
              alt={dish.name}
              className="media-img"
              style={{ height: 120, width: "100%", objectFit: "cover" }}
            />
            <h4>{dish.name}</h4>
            <p>{dish.description}</p>
            <p className="price">₹{dish.price}</p>
            <p style={{ color: "green" }}>Stock: {dish.stock}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                className="search-action"
                style={{ flex: 1 }}
                onClick={() => setEditingDish(dish)}
              >
                Edit
              </button>
              <button
                className="ghost-button"
                style={{ flex: 1, color: "red", border: "1px solid red" }}
                onClick={() => handleDelete(dish.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Floating Add Dish Button */}
      <button
        onClick={() =>
          setNewDish({ name: "", description: "", price: 0, stock: 0, image: "" })
        }
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#e53935",
          color: "white",
          fontSize: 28,
          border: "none",
        }}
      >
        +
      </button>

      {/* Edit Dish Modal */}
      {editingDish && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Dish</h3>
            <input
              type="text"
              value={editingDish.name}
              onChange={(e) =>
                setEditingDish({ ...editingDish, name: e.target.value })
              }
              placeholder="Dish Name"
            />
            <textarea
              value={editingDish.description}
              onChange={(e) =>
                setEditingDish({ ...editingDish, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              type="number"
              value={editingDish.price}
              onChange={(e) =>
                setEditingDish({ ...editingDish, price: Number(e.target.value) })
              }
              placeholder="Price"
            />
            <input
              type="number"
              value={editingDish.stock}
              onChange={(e) =>
                setEditingDish({ ...editingDish, stock: Number(e.target.value) })
              }
              placeholder="Stock"
            />
            <input
              type="text"
              value={editingDish.image}
              onChange={(e) =>
                setEditingDish({ ...editingDish, image: e.target.value })
              }
              placeholder="Image URL"
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="search-action" onClick={handleEditSave}>
                Save
              </button>
              <button
                className="ghost-button"
                onClick={() => setEditingDish(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Dish Modal */}
      {newDish && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Dish</h3>

            <label style={{display:'block',marginTop:'10px'}}>Dish Name</label>
            <input
              type="text"
              value={newDish.name}
              onChange={(e) =>
                setNewDish({ ...newDish, name: e.target.value })
              }
              placeholder="Enter Dish Name"
            />
            <textarea
              value={newDish.description}
              onChange={(e) =>
                setNewDish({ ...newDish, description: e.target.value })
              }
              placeholder="Description"
            />
            <label>Dish Price (₹)</label>
            <input
              type="number"
              value={newDish.price}
              onChange={(e) =>
                setNewDish({ ...newDish, price: Number(e.target.value) })
              }
              placeholder="Dish Price (₹)"
            />
            <label>Available Quantity</label>
            <input
              type="number"
              value={newDish.stock}
              onChange={(e) =>
                setNewDish({ ...newDish, stock: Number(e.target.value) })
              }
              placeholder="Available Quantity"
            />

            <input
              type="text"
              value={newDish.image}
              onChange={(e) =>
                setNewDish({ ...newDish, image: e.target.value })
              }
              placeholder="Image URL"
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="search-action" onClick={handleAddSave}>
                Add
              </button>
              <button
                className="ghost-button"
                onClick={() => setNewDish(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
