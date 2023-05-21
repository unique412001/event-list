import React, { useState, useContext, useEffect } from 'react';
import './Main.css';
import Event from './Event/Event';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';

const Main = () => {
  const [event, setEvent] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { addEvent } = useContext(GlobalContext);
  const { events } = useContext(GlobalContext);

  useEffect(() => {
    // Fetch products from API
    axios.get('https://api.example.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (productId) => {
    // Toggle the selected state of the product
    const updatedSelectedProducts = [...selectedProducts];
    if (updatedSelectedProducts.includes(productId)) {
      updatedSelectedProducts.splice(updatedSelectedProducts.indexOf(productId), 1);
    } else {
      updatedSelectedProducts.push(productId);
    }
    setSelectedProducts(updatedSelectedProducts);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Math.floor(Math.random() * 100000000),
      event,
      location,
      date,
      selectedProducts,
    };

    addEvent(newEvent);

    setEvent('');
    setLocation('');
    setDate('');
    setSelectedProducts([]);
  };

  return (
    <div className="Content">
      <div className="Header">
        <div className="Layer">Events</div>
      </div>
      <div className="Body">
        <ul className="Events">
          {events.map((item) => (
            <Event key={item.id} item={item} />
          ))}
        </ul>
        <div className="AddEvent">
          <form onSubmit={onSubmit}>
            <input
              className="eventField"
              value={event}
              type="text"
              onChange={(e) => setEvent(e.target.value)}
              placeholder="New Event"
            />
            <input
              className="eventField"
              value={location}
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <input
              className="eventField"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
            />
            <div className="productList">
              {products.map((product) => (
                <label key={product.id}>
                  <input
                    type="checkbox"
                    value={product.id}
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                  {product.name}
                </label>
              ))}
            </div>
            <button className="submitBtn" type="submit">
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
