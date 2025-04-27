export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return new Date(dateString).toLocaleDateString(undefined, options)
}

export function getCurrentTime(): string {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}

export function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function isToday(dateString: string): boolean {
  if (!dateString) return false
  const today = new Date().toISOString().split("T")[0]
  return dateString === today
}

export function capitalizeFirstLetter(string: string): string {
  if (!string) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}
