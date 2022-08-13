/**
 * Convert duration in milliseconds to  m:s format.
 * 
 * @param durationMs 
 * @returns 
 */
export function convertDuration(durationMs: number) {
    const seconds = ((durationMs / 1000) % 60)
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60)
    const secondsString = seconds < 10 ? '0' + seconds.toFixed(3) : seconds.toFixed(3)

    if (minutes < 1) {
        return secondsString
    }

    return minutes + ':' + secondsString
}
