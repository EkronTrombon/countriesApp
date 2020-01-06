import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.URL_REST;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${URL}/user/img/${userId}/${img}`;
  }

}
