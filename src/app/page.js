'use client';
import { useEffect, useState } from "react";

const Home = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8800/api/book/getbook/')
      .then((response) => response.json())  
      .then((data) => {
        setBooksData(data);  
      })
      .catch((error) => {
        console.error("Error fetching books:", error);  // Handle any errors
      });
  }, []);

  return (
    <section className="text-gray-600 body-font bg-gray-50">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {booksData.map((book) => (
            <div key={book.bookName} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                <a className="block relative h-72 rounded overflow-hidden">
                  <img
                    alt={book.bookName}
                    className="object-cover object-center w-full h-full block"
                    src={book.bookImage}
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-indigo-600 text-xs font-medium tracking-widest uppercase mb-2">{book.bookCategory}</h3>
                  <h2 className="text-gray-900 text-lg font-semibold mb-2">{book.bookName}</h2>
                  <p className="text-gray-500 text-sm mb-4">{book.bookDescription}</p> 
                  <p className="text-gray-500 text-xs mt-1">Author: <span className="text-gray-800 font-medium">{book.bookAuthor}</span></p>
                  <p className="text-gray-500 text-xs mt-1">Status: <span className={book.bookStatus === "Available" ? "text-green-500" : "text-red-500"}>{book.bookStatus}</span></p>
                  <p className="text-gray-500 text-xs mt-1">Genre: <span className="font-medium text-gray-800">{book.bookCategory}</span></p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">${book.bookCost}</p>
                    <button className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200 ease-in-out">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
