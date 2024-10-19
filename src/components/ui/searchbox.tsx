import useTaskStore from "@/store/useTask";
import { ChangeEvent } from "react";

const Searchbox = () => {
  const { searchTask } = useTaskStore((state) => state);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchTask(e.target.value.trim().toLocaleLowerCase());
  };

  return (
    <div className="w-full">
      {/* <form > */}
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-2 px-4 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-gray-500"
          placeholder="Search tasks with title, description..."
          required
          onChange={handleSearch}
        />
        {/* <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> */}
      </div>
      {/* </form> */}
    </div>
  );
};

export default Searchbox;
