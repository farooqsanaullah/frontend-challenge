import type React from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { todoFilterState, searchQueryState, itemsPerPageState } from "../recoil/atoms"
import { ChevronDown } from "lucide-react"

export function TodoFilter() {
  const [filter, setFilter] = useRecoilState(todoFilterState)
  const [itemsPerPage, setItemsPerPage] = useRecoilState(itemsPerPageState)
  const setSearchQuery = useSetRecoilState(searchQueryState)

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setItemsPerPage(value === "all" ? Number.POSITIVE_INFINITY : Number.parseInt(value, 10))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-slate-700 mb-2">Filter</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange("all")}
                className={`btn ${filter === "all" ? "bg-purple-500 text-white hover:bg-purple-600" : "btn-secondary"} transition-all duration-300 transform hover:scale-105 text-sm px-3 py-1 sm:px-3 sm:py-2 `}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("active")}
                className={`btn ${filter === "active" ? "bg-green-500 text-white hover:bg-green-600" : "btn-secondary"} transition-all duration-300 transform hover:scale-105 text-sm  px-3 py-1 sm:px-4 sm:py-2`}
              >
                Active
              </button>
              <button
                onClick={() => handleFilterChange("completed")}
                className={`btn ${filter === "completed" ? "bg-amber-500 text-white hover:bg-amber-600" : "btn-secondary"} transition-all duration-300 transform hover:scale-105 text-sm  px-3 py-1 sm:px-4 sm:py-2`}
              >
                Completed
              </button>
              <button
                onClick={() => handleFilterChange("today")}
                className={`btn ${filter === "today" ? "bg-pink-500 text-white hover:bg-pink-600" : "btn-secondary"} transition-all duration-300 transform hover:scale-105 text-sm  px-3 py-1 sm:px-4 sm:py-2`}
              >
                Today
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xs sm:text-sm font-medium text-slate-700 mb-2">Items per page</h2>
            <div className="relative">
              <select
                value={itemsPerPage === Number.POSITIVE_INFINITY ? "all" : itemsPerPage.toString()}
                onChange={handleItemsPerPageChange}
                className="appearance-none w-full bg-white border border-slate-300 rounded-md py-1 sm:py-2 pl-2 sm:pl-3 pr-8 sm:pr-10 text-sm sm:text-base text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="all">All</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title..."
              onChange={handleSearchChange}
              className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
