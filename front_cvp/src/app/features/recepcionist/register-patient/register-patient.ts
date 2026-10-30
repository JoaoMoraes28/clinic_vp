import { Component, ElementRef, inject, OnInit, Renderer2, signal, viewChild } from '@angular/core';
import { ProfilePerson } from '../../../svg/profile-person/profile-person';
import { InputDefault, Input } from '../../../shared/input/input';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ConfirmButton } from '../../../shared/button/confirm/confirm-button';
import { FieldsetList } from '../consultation/schedule-consultation/components/fieldset-list/fieldset-list';
import { ListDatas } from '../consultation/schedule-consultation/schedule-consultation';
import { Cep } from '../../../repo/cep/cep';
import { Patient, PatientRegister } from '../../../repo/patient/patient';
import { Uf } from '../../../repo/uf/uf';
import { translateBloodTypeEn, translateCivilStateEn, translateGenderEn } from '../../../utils/translate-datas';
import { Cloudinary } from '../../../repo/cloudinary/cloudinary';
import { ModalResponse } from '../../../services/modal-response/modal-response';
import { desactiveScroll } from '../../../utils/renderer-document';

@Component({
  imports: [ProfilePerson, Input, ɵInternalFormsSharedModule, ReactiveFormsModule, ConfirmButton, FieldsetList],
  selector: 'app-register-patient',
  templateUrl: './register-patient.html'
})
export class RegisterPatient implements OnInit {
  formBuilder = inject(FormBuilder);
  private readonly render = inject(Renderer2);
  private serviceCep = inject(Cep);
  private serviceUf = inject(Uf);
  private servicePatient = inject(Patient);
  private serviceCloudinary = inject(Cloudinary);
  private serviceResponseModal = inject(ModalResponse);

  private imgProfile = viewChild<ElementRef>('profileImg');

  changeImgProfileView = signal<boolean>(true);

  private imgFile: File | null = null;

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
      type: 'date',
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

  changeImgProfile(e: HTMLInputElement) {
    if (e.files != null) {
      const blob = URL.createObjectURL(e.files[0]);

      if (this.imgProfile() != null) {
        const img: HTMLImageElement = this.imgProfile()?.nativeElement;
        img.src = blob;
        this.imgFile = e.files[0];
        this.changeImgProfileView.set(false);
      }
    }
  }

  async onSubmit() {
    if (!this.profileForm.valid) {
      console.log("Campos inválidos");

    } else {
      const ufs = await this.serviceUf.getUf();

      if (!ufs) return;

      let urlProfileImg = null;

      if (this.imgFile != null) urlProfileImg = await this.serviceCloudinary.getUrlImgProfile(this.imgFile);

      const onlyNumbers = (valor: string | null | undefined): string | null => {
        if (!valor) return null;
        return valor.replace(/\D/g, '');
      };

      const formValues = this.profileForm.value;

      const newPatient: PatientRegister = {
        patient: {
          name: formValues.name!,
          professional: formValues.profession || null,
          cpf: onlyNumbers(formValues.cpf)!,
          gender: translateGenderEn(formValues.gender!),
          phone: onlyNumbers(formValues.phone)!,
          email: formValues.email || null,
          civil_state: translateCivilStateEn(formValues.civilState!),
          photo: urlProfileImg,
          blood_type: translateBloodTypeEn(formValues.bloodType!) || null,
          weight: formValues.weight ? Number(formValues.weight) : null,
          height: formValues.height ? Number(formValues.height) : null,
          born_date: formValues.bornDate!,
          phone_emergency: onlyNumbers(formValues.emergencyPhone),
          notes: formValues.observations || null
        },
        address: {
          city: formValues.city!,
          district: formValues.district!,
          street: formValues.street!,
          number: formValues.number!,
          cep: onlyNumbers(formValues.cep)!,
          uf_id: 0
        }
      };

      this.postPatient(ufs, newPatient, formValues.uf!);

    }
  }

  private async postPatient(ufs: Uf[], patient: PatientRegister, ufSelected: string) {
    const ufId: Uf[] = ufs.filter(it => it.abbreviation.includes(ufSelected));

    patient.address.uf_id = ufId[0].id;

    const response = await this.servicePatient.postPatient(patient);

    if (!response) return;

    this.serviceResponseModal.setTitle("Cadastro de paciente");

    this.serviceResponseModal.setModalResponseOpening(true);
    desactiveScroll(false, this.render);
  }

  getCep(cep: string) {
    let cepFormated = cep.replace('-', '');

    if (cepFormated.length == 8) {
      this.serviceCep.getAddressByCep(cepFormated).subscribe({
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

  async ngOnInit(): Promise<void> {
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

    this.profileForm.get('cep')?.valueChanges.subscribe(value => {
      if (!value) return;

      let numbers = value.replace(/\D/g, '');
      let cepFormated = '';

      if (numbers.length === 0) {
        cepFormated = '';
      }
      else if (numbers.length <= 5) {
        cepFormated = numbers;
      }
      else {
        let part1 = numbers.substring(0, 5);
        let part2 = numbers.substring(5, 8);

        cepFormated = part1 + '-' + part2;
      }

      this.profileForm.get('cep')?.setValue(cepFormated, { emitEvent: false });
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

}
