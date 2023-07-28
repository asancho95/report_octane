import { Component, Input } from '@angular/core';
import { DETAIL_HEADERS } from 'src/app/models/report-headers.enum';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
	@Input() title: string = "Detalle";
	@Input() element: any | undefined;

	get headers(): string[] {
		return DETAIL_HEADERS;
	}

	get dataSource() {
		return new MatTableDataSource(this.element);
	}
}
