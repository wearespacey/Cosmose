import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { FaceDetectorComponent } from './face-detector/face-detector.component';

const routes: Routes = [
  {path: 'generator', component: GeneratorComponent},
  {path: 'detector', component: FaceDetectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
