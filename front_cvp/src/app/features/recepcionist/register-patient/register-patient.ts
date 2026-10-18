import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfilePerson } from '../../../svg/profile-person/profile-person';
import { InputDefault, Input } from '../../../shared/input/input';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ConfirmButton } from '../../../shared/button/confirm/confirm-button';
import { FieldsetList } from '../consultation/schedule-consultation/components/fieldset-list/fieldset-list';
import { ListDatas } from '../consultation/schedule-consultation/schedule-consultation';
import { Cep } from '../../../repo/cep/cep';
import { PatientRegister } from '../../../repo/patient/patient';
import { Uf } from '../../../repo/uf/uf';

@Component({
  imports: [ProfilePerson, Input, ɵInternalFormsSharedModule, ReactiveFormsModule, ConfirmButton, FieldsetList],
  selector: 'app-register-patient',
  templateUrl: './register-patient.html'
})
export class RegisterPatient implements OnInit {
  formBuilder = inject(FormBuilder);
  private serviceCep = inject(Cep);
  private serviceUf = inject(Uf);

  profileForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    cpf: ['', Validators.required],
    civilState: ['', Validators.required],
    gender: ['', Validators.required],
    profession: [''],
    email: [''],
    phone: ['', Validators.required],
    emergencyPhone: [''],
    weight: [''],
    height: [''],
    bornDate: ['', Validators.required],
    bloodType: [''],
    cep: ['', Validators.required],
    city: ['', Validators.required],
    uf: ['', Validators.required],
    district: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    observations: ['', Validators.required]
  });

  inputsDatas: InputDefault[] = [
    {
      id: 'name',
      type: 'text',
      label: 'Nome',
      placeholder: 'Angélica do Santos Silva',
      validField: this.profileForm.controls.name.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'cpf',
      type: 'text',
      label: 'CPF',
      placeholder: '123.456.789.10',
      validField: this.profileForm.controls.cpf.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'civilState',
      type: 'select',
      label: 'Estado Civil',
      placeholder: 'Clique para selecionar',
      validField: this.profileForm.controls.civilState.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: true,
      readonly: true,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'gender',
      type: 'select',
      label: 'Gênero',
      placeholder: 'Clique para selecionar',
      validField: this.profileForm.controls.gender.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: true,
      readonly: true,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'profession',
      type: 'text',
      label: 'Profissão',
      placeholder: 'Professor, Diarista, Caminhoneiro...',
      validField: this.profileForm.controls.profession.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: false,
      visibleList: signal(false)
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'carlosalmeida@gmail.com',
      validField: this.profileForm.controls.email.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: false,
      visibleList: signal(false)
    },
    {
      id: 'phone',
      type: 'text',
      label: 'Telefone',
      placeholder: '(11) 93190-4819',
      validField: this.profileForm.controls.phone.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'emergencyPhone',
      type: 'text',
      label: 'Telefone emergência',
      placeholder: '(11) 93190-4819',
      validField: this.profileForm.controls.emergencyPhone.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: false,
      visibleList: signal(false)
    },
    {
      id: 'weight',
      type: 'number',
      label: 'Peso',
      placeholder: '71.5 (Kg)',
      validField: this.profileForm.controls.weight.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: false,
      visibleList: signal(false)
    },
    {
      id: 'height',
      type: 'number',
      label: 'Altura',
      placeholder: '175 (centímetros)',
      validField: this.profileForm.controls.height.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: false,
      visibleList: signal(false)
    },
    {
      id: 'bornDate',
      type: 'date  ',
      label: 'Data de nascimento',
      placeholder: '30/09/1998',
      validField: this.profileForm.controls.bornDate.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'bloodType',
      type: 'select',
      label: 'Tipo sanguíneo',
      placeholder: 'Clique para selecionar',
      validField: this.profileForm.controls.bloodType.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: true,
      readonly: true,
      mandatory: false,
      visibleList: signal(false)
    },
    {
      id: 'cep',
      type: 'text',
      label: 'CEP',
      placeholder: '00000-000',
      validField: this.profileForm.controls.cep.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'city',
      type: 'text',
      label: 'Cidade',
      placeholder: 'Baruei',
      validField: this.profileForm.controls.city.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: true,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'uf',
      type: 'text',
      label: 'UF',
      placeholder: 'SP',
      validField: this.profileForm.controls.uf.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: true,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'district',
      type: 'text',
      label: 'Bairro',
      placeholder: 'Jardim das Palmas',
      validField: this.profileForm.controls.district.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: true,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'street',
      type: 'text',
      label: 'Rua',
      placeholder: 'Rua Parque das Flores',
      validField: this.profileForm.controls.street.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: true,
      mandatory: true,
      visibleList: signal(false)
    },
    {
      id: 'number',
      type: 'text',
      label: 'Número',
      placeholder: '167',
      validField: this.profileForm.controls.number.valid,
      errorMessage: 'Campo obrigatório',
      showArrow: false,
      readonly: false,
      mandatory: true,
      visibleList: signal(false)
    }
  ];

  civilState: ListDatas[] = [
    {
      id: 1,
      value: "Solteiro(a)"
    },
    {
      id: 2,
      value: "Casado(a)"
    },
    {
      id: 3,
      value: "Divorciado(a)"
    },
    {
      id: 4,
      value: "Viúvo(a)"
    },
    {
      id: 5,
      value: "Separado(a)"
    }
  ];

  gender: ListDatas[] = [
    {
      id: 1,
      value: 'Masculino'
    },
    {
      id: 2,
      value: 'Feminino'
    }
  ]

  bloodType: ListDatas[] = [
    { id: 1, value: 'A+' },
    { id: 2, value: 'A-' },
    { id: 3, value: 'B+' },
    { id: 4, value: 'B-' },
    { id: 5, value: 'AB+' },
    { id: 6, value: 'AB-' },
    { id: 7, value: 'O+' },
    { id: 8, value: 'O-' }
  ]

  closeOnClickModal(e: Event) {
    const element = e.target as HTMLElement;

    if (element.id == 'civilState') {
      this.inputsDatas[3].visibleList.set(false);
      this.inputsDatas[11].visibleList.set(false);
      return;

    } else if (element.id == 'gender') {
      this.inputsDatas[2].visibleList.set(false);
      this.inputsDatas[11].visibleList.set(false);
      return;

    } else if (element.id == 'bloodType') {
      this.inputsDatas[2].visibleList.set(false);
      this.inputsDatas[3].visibleList.set(false);
      return;

    }

    this.inputsDatas[2].visibleList.set(false);
    this.inputsDatas[3].visibleList.set(false);
    this.inputsDatas[11].visibleList.set(false);

  }

  openModalChoice(id: string) {
    const formField: InputDefault[] = this.inputsDatas.filter(it => it.id == id);
    formField[0].visibleList.set(!formField[0].visibleList())
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      console.log("Campos inválidos");

    } else {
      this.serviceUf.getUf().subscribe(ufs => {
        const newPatient: PatientRegister = {
          patient: {
            name: this.profileForm.value.name!,
            professional: this.profileForm.value.profession ? this.profileForm.value.profession : null,
            cpf: this.profileForm.value.cpf!,
            gender: this.profileForm.value.gender!,
            phone: this.profileForm.value.phone!,
            email: this.profileForm.value.email ? this.profileForm.value.email : null,
            civil_state: this.profileForm.value.civilState!,
            photo: null,
            blood_type: this.profileForm.value.bloodType ? this.profileForm.value.bloodType : null,
            weight: this.profileForm.value.weight ? Number(this.profileForm.value.weight) : null,
            height: this.profileForm.value.height ? Number(this.profileForm.value.height) : null,
            born_date: this.profileForm.value.bornDate!,
            phone_emergency: this.profileForm.value.emergencyPhone ? this.profileForm.value.emergencyPhone : null,
            notes: this.profileForm.value.observations ? this.profileForm.value.observations : null
          },
          address: {
            city: this.profileForm.value.city!,
            district: this.profileForm.value.district!,
            street: this.profileForm.value.street!,
            number: this.profileForm.value.number!,
            cep: this.profileForm.value.cep!,
            uf_id: 1
          }
        }
        console.log(123)
        this.postPatient(ufs, newPatient, this.profileForm.value.uf!)
      })


    }
  }

  private postPatient(ufs: Uf[], patient: PatientRegister, ufSelected: string) {
    const ufId: Uf[] = ufs.filter(it => it.abbreviation.includes(ufSelected));
    console.log(222)
    patient.address.uf_id = ufId[0].id;

    console.log(patient);
  }

  ngOnInit(): void {
    this.profileForm.get('cpf')?.valueChanges.subscribe(value => {
      if (!value) return;

      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      let formatted = numericValue;

      if (numericValue.length > 9) {
        formatted = numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else if (numericValue.length > 6) {
        formatted = numericValue.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
      } else if (numericValue.length > 3) {
        formatted = numericValue.replace(/(\d{3})(\d+)/, '$1.$2');
      }

      this.profileForm.get('cpf')?.setValue(formatted, { emitEvent: false });

    })

    this.profileForm.get('phone')?.valueChanges.subscribe(value => {
      if (!value) return;

      const formatted = this.formattedPhone(value);

      this.profileForm.get('phone')?.setValue(formatted, { emitEvent: false });

    })

    this.profileForm.get('emergencyPhone')?.valueChanges.subscribe(value => {
      if (!value) return;

      const formatted = this.formattedPhone(value);

      this.profileForm.get('emergencyPhone')?.setValue(formatted, { emitEvent: false });

    })
  }

  getCep(cep: string) {
    if (cep.length == 8) {
      this.serviceCep.getAddressByCep(cep).subscribe({
        next: (value) => {
          this.profileForm.controls.city.setValue(value.localidade);
          this.profileForm.controls.uf.setValue(value.uf);
          this.profileForm.controls.district.setValue(value.bairro);
          this.profileForm.controls.street.setValue(value.logradouro);
        }
      });

    } else {
      this.profileForm.controls.city.setValue('');
      this.profileForm.controls.uf.setValue('');
      this.profileForm.controls.district.setValue('');
      this.profileForm.controls.street.setValue('');
    }

    return;
  }

  private formattedPhone(val: string): string {
    const digits = val.replace(/\D/g, '').slice(0, 11);

    if (digits.length <= 2) {
      return digits.length > 0 ? `(${digits}` : digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  }
}
