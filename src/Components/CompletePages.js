import React from "react";

export default function CompletePages({ books, target }) {
  const results = target
    ? books
        .filter((f) => f.name.toLowerCase() === target)[0]
        .lists.filter((r) => r.isCompleted)
    : books
        .reduce((a, b) => {
          return [...a, ...b.lists];
        }, [])
        .filter((r) => r.isCompleted);
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-500 mb-6">Comeplete</h2>
      <div className="flex flex-col space-y-2.5">
        {!results.length ? (
          <div className="text-center text-sm text-gray-500">
            Create some lists and start working!
          </div>
        ) : (
          results.map((b) => {
            return (
              <div
                key={b.id}
                className="flex flex-row rounded bg-white shadow py-3 px-4 justify-between"
              >
                <div>{b.title}</div>
                <div>{b.member}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
