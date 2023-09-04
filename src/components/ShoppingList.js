import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";


function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  
  const handleAddItem = (newItem) => {
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });


  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then((response) => response.json())
    .then((items) => setItems(items))
  },[])

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id){
        return updatedItem;
      } else{
        return item
      }
    })
    setItems(updatedItems)
  }


  const handleDeleteItem = (deletedItem) => {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  return (
    <div className="ShoppingList">
      <ItemForm onAddItem = {handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem = {handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
