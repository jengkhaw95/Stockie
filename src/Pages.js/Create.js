import React, { useState } from "react";

export default function Create({ setBooks }) {
  const [t, st] = useState("");
  const handleCreateNewBook = (e) => {
    e.preventDefault();
    setBooks((b) => [...b, { name: t.toLowerCase().trim(), lists: [] }]);
  };
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-500 mb-6">
        Create New Book
      </h2>
      <div className="rounded bg-white shadow p-6">
        <form className="flex flex-col space-y-5">
          <div className="flex flex-row space-x-6">
            <div className="flex flex-col flex-grow space-y-2">
              <label htmlFor="task-title" className="font-medium">
                Title
              </label>
              <input
                type="text"
                name="task-title"
                id="task-title"
                className="border rounded py-1.5 px-2"
                value={t}
                onChange={(e) => st(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              className=" rounded bg-green-400 text-white py-2 px-4"
              onClick={(e) => {
                handleCreateNewBook(e);
              }}
            >
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
