import { format } from "date-fns";

export const date = new Date();

export function getToday(): Date {
    return date;
} 

export function getDateFormatted(date: Date): string {
    return format(date, 'dd/MM/yyyy');
}