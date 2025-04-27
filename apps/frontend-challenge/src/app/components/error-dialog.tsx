
interface ErrorDialogProps {
  message: string
  isOpen: boolean
  onClose: () => void
}

export function ErrorDialog({ message, isOpen, onClose }: ErrorDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-red-600">Error</h3>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
