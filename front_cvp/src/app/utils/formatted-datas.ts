export function formattedCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '').slice(0, 11);

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}

export function formattedPhone(phone: string): string {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
}