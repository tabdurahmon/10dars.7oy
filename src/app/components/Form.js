"use client";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

function Form() {
  const [products, setproducts] = useState([]);

  // Ma'lumotlarni olish
  useEffect(() => {
    fetch("http://localhost:4000/tickets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setproducts(data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const author = formData.get("author");

    fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((newproduct) => {
        console.log("New product added:", newproduct);
        setproducts([...products, newproduct]);
        e.target.reset();
      })
      .catch((error) => {
        console.error("Post error:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/tickets/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setproducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded-lg p-8 mb-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Add New Tickets
          </h2>
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 mb-1">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter ticket title"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-gray-700 mb-1">
                description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter descriptions"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Tickets List
          </h2>
          <ul>
            {products.length > 0 ? (
              products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-600">{product.author}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TiDeleteOutline size={24} />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No products available.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Form;
