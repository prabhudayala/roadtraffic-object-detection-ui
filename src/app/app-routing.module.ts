import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageBoxComponent } from './image-box/image-box.component';
import { VideoBoxComponent } from './video-box/video-box.component';
import { LiveBoxComponent } from './live-box/live-box.component';


const routes: Routes = [{ path: 'image', component: ImageBoxComponent },
{ path: 'video', component: VideoBoxComponent },
{ path: 'live', component: LiveBoxComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
