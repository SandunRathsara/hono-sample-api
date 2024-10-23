export const DateTimeShort = (date?: Date) => {
    if (!date) date = new Date()
    const INTL = Intl.DateTimeFormat('en-LK', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })
    return INTL.format(date)
}