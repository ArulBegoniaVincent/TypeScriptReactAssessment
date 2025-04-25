import React from "react";
import InventoryForm from "./Components/InventoryForm";
import InventoryList from "./Components/InventoryList";

const App: React.FC = () => {
  return(
    <div className="container">
      <h1>Inventory Automation System</h1>
      <InventoryForm />
      <InventoryList />
    </div>
  )
}

export default App;