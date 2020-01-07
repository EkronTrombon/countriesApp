import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(img: string): any {
    const domImg = `background-image: url('${img}');`;
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }

}
