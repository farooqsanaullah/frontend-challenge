import { useRecoilValue } from "recoil"
import { todoStatsState } from "../recoil/selectors"

export function TodoStats() {
  const { total, completed } = useRecoilValue(todoStatsState)

  return (
    <div className="flex justify-between items-center mb-4 text-xs sm:text-sm text-slate-600 bg-slate-100 p-2 sm:p-3 rounded-md">
      <div>
        <span className="font-medium">Total:</span> {total}
      </div>
      <div>
        <span className="font-medium">Completed:</span> {completed}
      </div>
      <div>
        <span className="font-medium">Remaining:</span> {total - completed}
      </div>
    </div>
  )
}
