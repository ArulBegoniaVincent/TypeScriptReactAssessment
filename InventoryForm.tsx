import React, { useState } from "react";
  import "./Inventory.css";
  
  interface Inventory {
    id: number;
    name: string;
    quantity: number;
    supplier: string;
    location: string;
    threshold: number;
  }
  
  const InventoryForm: React.FC = () => {
    const [inventory, setInventory] = useState({
      id:"",
      name: "",
      quantity: "",
      supplier: "",
      location: "",
      threshold: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInventory({ ...inventory, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();    
      const response = await fetch('http://localhost:5001/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventory)
      });
      if (response.ok) {
        alert('Inventory details added successfully!');
        setInventory({ id: '', name: '', quantity: '', supplier: '', location: '', threshold: '' });
      }
    };
  
    return (
      <div className="container">
        <h2>Add Inventory</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="id">Product ID:</label></td>
                  <td><input type="text" id="id" name="id" value={inventory.id} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="name">Product Name:</label></td>
                  <td><input type="text" id="name" name="name" value={inventory.name} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="quantity">Quantity:</label></td>
                  <td><input type="text" id="quantity" name="quantity" value={inventory.quantity} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="supplier">Supplier:</label></td>
                  <td><input type="text" id="supplier" name="supplier" value={inventory.supplier} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="location">Location:</label></td>
                  <td><input type="text" id="location" name="location" value={inventory.location} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="threshold">Threshold:</label></td>
                  <td><input type="text" id="threshold" name="threshold" value={inventory.threshold} onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default InventoryForm;

  