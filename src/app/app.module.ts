import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { DetailComponent } from './components/detail/detail.component';
import { FormsModule } from '@angular/forms';
import { ManagementComponent } from './components/management/management.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DetailComponent,
  		ManagementComponent
	],
	imports: [
		BrowserModule,
        FormsModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-center'
		}),
		MaterialModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					component: HomeComponent
				},
				{
					path: 'setup',
					component: ManagementComponent
				},
				{
					path: '**',
					component: HomeComponent
				}
			]
		),
		BrowserAnimationsModule
	],
	providers: [PercentPipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
