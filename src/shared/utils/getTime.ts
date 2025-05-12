export const formatTimeDate = (time: number) => {
    const date = new Date(time)

    const hours = date.getHours()
    const minutes = date.getMinutes()

    // Pad the hours and minutes to ensure they are always two digits
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    return formattedTime
}

export const formatTime = (milliseconds: number, withSeconds = false) => {
    const totalSeconds = Math.floor(milliseconds / 1000) // Convert milliseconds to seconds
    const minutes = Math.floor(totalSeconds / 60) // Get minutes
    const seconds = totalSeconds % 60 // Get the remaining seconds
    let hours = 0

    // If minutes exceed 60, calculate the hours
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60)
    }

    // If withSeconds is true, return MM:SS or HH:MM:SS
    if (withSeconds) {
        if (hours > 0) {
            return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        }
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }

    // If withSeconds is false, return only MM if minutes < 60 or HH:MM if more than 60 minutes
    if (minutes >= 60) {
        return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
    }

    return `${String(minutes).padStart(2, "0")}`
}
