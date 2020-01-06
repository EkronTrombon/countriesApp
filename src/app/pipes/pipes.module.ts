import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [
    ImageSanitizerPipe,
    ImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageSanitizerPipe,
    ImagePipe
  ]
})
export class PipesModule { }
