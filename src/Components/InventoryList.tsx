import React, { useState, useEffect } from "react";
import "./Inventory.css";
  
  interface Inventory {
    id: number;
    name: string;
    quantity: number;
    supplier: string;
    location: string;
    threshold: number;
  }
  
  const InventoryList: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
  
    const fetchInventories = async () => {
      const response = await fetch("http://localhost:5001/inventory");
      const data = await response.json();
      setInventories(data);    
    };
  
    const handleSearch = async () => {
      if (searchTerm.trim() === "") {
        fetchInventories();
        return;
      }
  
      const id = Number(searchTerm.trim());    
      if (isNaN(id)) {
        alert("Please enter a valid ID.");
        return;
      }
  
      const response = await fetch(`http://localhost:5001/inventory/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInventories([data]);
      } else {
        alert("Contact not found.");
        setInventories([]);
      }
    };
  
    const handleDelete = async (id: number) => {
      const response = await fetch(`http://localhost:5001/inventory/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Inventory data deleted successfully!");
        fetchInventories();
      }
    };
  
    const handleUpdate = async (id: number) => {
      const updatedInventory = {
        id,
        name: prompt("Enter new name:") ?? "",
        quantity: prompt("Enter new quantity:") ?? "",
        supplier: prompt("Enter new supplier:") ?? "",
        location: prompt("Enter new location:") ?? "",
        threshold: prompt("Enter new threshold:") ?? "",
      };
  
      const response = await fetch(`http://localhost:5001/inventory/${id}`, {
        method: "PUT",    
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInventory),
      });
  
      if (response.ok) {
        alert("Inventory updated successfully!");
        fetchInventories();
      }
    };
  
    useEffect(() => {
      fetchInventories();
    }, []);
  
    return (
      <div className="container">
        <h2>Inventory List</h2>
  
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="inventory-search"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
  
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Location</th>
              <th>Threshold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventories.length > 0 ? (
              inventories.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.id}</td>
                  <td>{inventory.name}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.supplier}</td>
                  <td>{inventory.location}</td>
                  <td>{inventory.threshold}</td>
                  <td>
                    <button onClick={() => handleUpdate(inventory.id)}>Edit</button>
                    <button onClick={() => handleDelete(inventory.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>
                  No inventories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default InventoryList;