import { useRecoilState, useRecoilValue } from "recoil"
import { currentPageState } from "../recoil/atoms"
import { totalPagesSelector } from "../recoil/selectors"
import { ChevronLeft, ChevronRight } from "lucide-react"
export function Pagination() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
  const totalPages = useRecoilValue(totalPagesSelector)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base ${
          currentPage === 1 ? "bg-blue-500 text-white" : "bg-slate-200 hover:bg-slate-300"
        }`}
      >
        1
      </button>,
    )

    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-2 text-sm sm:text-base">
          ...
        </span>,
      )
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            {i}
          </button>,
        )
      }
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-2 text-sm sm:text-base">
          ...
        </span>,
      )
    }
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base ${
            currentPage === totalPages ? "bg-blue-500 text-white" : "bg-slate-200 hover:bg-slate-300"
          }`}
        >
          {totalPages}
        </button>,
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 rounded-md ${
          currentPage === 1 ? "text-slate-400 cursor-not-allowed" : "bg-slate-200 hover:bg-slate-300"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex space-x-1">{renderPageNumbers()}</div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1 rounded-md ${
          currentPage === totalPages ? "text-slate-400 cursor-not-allowed" : "bg-slate-200 hover:bg-slate-300"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
