export function translateGender(gender: string): string {
    switch (gender) {
        case 'MALE':
            return 'Masculino';

        case 'FEMALE':
            return 'Feminino';
    }

    return '';
}

export function translateStatusConsultation(status: string): string {
    switch (status) {
        case 'SCHEDULED':
            return 'Agendada';

        case 'WAITING':
            return 'Em espera';

        case 'IN_PROGRESS':
            return 'Em andamento';

        case 'COMPLETED':
            return 'Concluída';

        case 'CANCELED':
            return 'Cancelada';
    }

    return '';
}

export function translateCivilState(state: string): string {
    switch (state) {
        case 'SINGLE':
            return 'Solteiro(a)';

        case 'MARRIED':
            return 'Casado(a)';

        case 'DIVORCIED':
            return 'Divorciado(a)';

        case 'WIDOWED':
            return 'Viúvo(a)';

        case 'SEPARATED':
            return 'Separado(a)';

    }

    return '';
}

export function translateStatusEmployee(status: string): string {
    switch (status) {
        case 'ACTIVE':
            return 'Ativo(a)';

        case 'DESACTIVE':
            return 'Desativado(a)';

        case 'VACATION':
            return 'De férias';

        case 'AWAY':
            return 'Afastado';

    }

    return '';
}

export function translateBloodType(type: string): string {
    switch (type) {
        case 'A_POSITIVE':
            return 'A+';

        case 'A_NEGATIVE':
            return 'A-';

        case 'B_POSITIVE':
            return 'B+';

        case 'B_NEGATIVE':
            return 'B-';

        case 'AB_POSITIVE':
            return 'AB+';

        case 'AB_NEGATIVE':
            return 'AB-';

        case 'O_POSITIVE':
            return 'O-';

        case 'O_NEGATIVE':
            return 'O+';
    }

    return '';
}

export function translatePriorityExame(priority: string): string {
    switch (priority) {
        case 'NORMAL':
            return 'Normal';

        case 'URGENT':
            return 'Urgente';
    }

    return '';
}