import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Cloudinary {
    private readonly cloudName = environment.cloudinaryName;
    private readonly http = inject(HttpClient);

    async getUrlImgProfile(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'ml_default')

        const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

        const response: any = await firstValueFrom(this.http.post(url, formData));

        return response.secure_url;
    }
}
