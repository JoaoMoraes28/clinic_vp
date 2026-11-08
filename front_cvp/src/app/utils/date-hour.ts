import { differenceInYears } from "date-fns";

export const date = new Date();

export function getToday(): Date {
    return date;
}

export function getDateFormatted(date: Date | string): string {
    const dateIso = new Date(date);

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(dateIso);
}

export function formattedHour(hour: string): string {
    return hour.slice(0, 5);
}

export function getYearsDifference(start_date: Date | string, end_date: Date | string) {
    return differenceInYears(end_date, start_date);
}