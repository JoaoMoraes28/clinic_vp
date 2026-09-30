import { differenceInYears, format, subYears } from "date-fns";

export const date = new Date();

export function getToday(): Date {
    return date;
}

export function getDateFormatted(date: Date | string): string {
    return format(date, 'dd/MM/yyyy');
}

export function formattedHour(hour: string): string {
    return hour.slice(0, 5);
}

export function getYearsDifference(start_date: Date | string, end_date: Date | string) {
    return differenceInYears(end_date, start_date);
}