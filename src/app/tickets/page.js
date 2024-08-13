"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TicketsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:4000/tickets");
        if (!response.ok) {
          throw new Error("Tarmoq javobi xato bo'ldi");
        }
        const data = await response.json();
        setProducts(data);
        console.log("Fetched data:", data); // Ma'lumotlarni konsolga chiqarish
      } catch (error) {
        console.error("Fetch operatsiyasida muammo yuz berdi:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h2>Tickets</h2>
        <p>Currently open tickets.</p>
      </div>

      <div>
        <Link href="/">
          <button className="btn-primary">New Tickets</button>
        </Link>
      </div>

      <div className="flex flex-col space-y-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/tickets/${product.id}`}
            className="text-blue-500 hover:underline"
          >
            {product.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
