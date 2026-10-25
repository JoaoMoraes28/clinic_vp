export function translateGenderBr(gender: string): string {
    switch (gender) {
        case 'MALE':
            return 'Masculino';

        case 'FEMALE':
            return 'Feminino';
    }

    return '';
}

export function translateStatusConsultationBr(status: string): string {
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

export function translateCivilStateBr(state: string): string {
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

export function translateStatusEmployeeBr(status: string): string {
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

export function translateBloodTypeBr(type: string): string {
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

        case 'O_NEGATIVE':
            return 'O-';

        case 'O_POSITIVE':
            return 'O+';
    }

    return '';
}

export function translatePriorityExameBr(priority: string): string {
    switch (priority) {
        case 'NORMAL':
            return 'Normal';

        case 'URGENT':
            return 'Urgente';
    }

    return '';
}

export function translateGenderEn(gender: string): string {
    switch (gender) {
        case 'Masculino':
            return 'MALE';

        case 'Feminino':
            return 'FEMALE';
    }

    return '';
}

export function translateStatusConsultationEn(status: string): string {
    switch (status) {
        case 'Agendada':
            return 'SCHEDULED';

        case 'Em espera':
            return 'WAITING';

        case 'Em andamento':
            return 'IN_PROGRESS';

        case 'Concluída':
            return 'COMPLETED';

        case 'Cancelada':
            return 'CANCELED';
    }

    return '';
}

export function translateCivilStateEn(state: string): string {
    switch (state) {
        case 'Solteiro(a)':
            return 'SINGLE';

        case 'Casado(a)':
            return 'MARRIED';

        case 'Divorciado(a)':
            return 'DIVORCIED';

        case 'Viúvo(a)':
            return 'WIDOWED';

        case 'Separado(a)':
            return 'SEPARATED';
    }

    return '';
}

export function translateStatusEmployeeEn(status: string): string {
    switch (status) {
        case 'Ativo(a)':
            return 'ACTIVE';

        case 'Desativado(a)':
            return 'DESACTIVE';

        case 'De férias':
            return 'VACATION';

        case 'Afastado':
            return 'AWAY';
    }

    return '';
}

export function translateBloodTypeEn(type: string): string {
    switch (type) {
        case 'A+':
            return 'A_POSITIVE';

        case 'A-':
            return 'A_NEGATIVE';

        case 'B+':
            return 'B_POSITIVE';

        case 'B-':
            return 'B_NEGATIVE';

        case 'AB+':
            return 'AB_POSITIVE';

        case 'AB-':
            return 'AB_NEGATIVE';

        case 'O+':
            return 'O_POSITIVE';

        case 'O-':
            return 'O_NEGATIVE';
    }

    return '';
}

export function translatePriorityExameEn(priority: string): string {
    switch (priority) {
        case 'Normal':
            return 'NORMAL';

        case 'Urgente':
            return 'URGENT';
    }

    return '';
}