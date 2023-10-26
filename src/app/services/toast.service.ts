import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private _toastr: ToastrService) { }

	succes(title: string, message: string) {
		this._toastr.success(message, title,
			{
				positionClass: 'toast-top-center',
			})
	}

	error(title: string, message: string) {
		this._toastr.error(message, title,
			{
				positionClass: 'toast-top-center',
			})
	}

	warning(title: string, message: string) {
		this._toastr.warning(message, title,
			{
				positionClass: 'toast-top-center',
			})
	}
}
