import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatTableDataSource } from '@angular/material/table';
import { HeadersToCheck, TEAM_EFICIENCY_HEADERS } from 'src/app/models/report-headers.enum';
import { Utils } from 'src/app/utils/utils';
import { ConfigService } from 'src/app/services/config.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    @ViewChild('fileImported') fileImported?: ElementRef;

	selectedColumn?: string;
	selectedData?: any;
	detailSelected: string = "Detalle";

	get dataSource() {
		return new MatTableDataSource(this.reportService.reportImported.reportData);
	}

	get teamDataSource() {
		return new MatTableDataSource(this.reportService.reportImported.eficiency.teamEficiency);
	}

	get teamHeaders(): string[] {
		return TEAM_EFICIENCY_HEADERS.map((header: any) => header.name);
	}

	constructor(public reportService: ReportService, private _configService: ConfigService) {}

	ngOnInit(): void {
		this._configService.startApp();
		if(this.reportService.reportImported) {
			this.reportService.refreshData();
		}
	}

	async fileSelected(event: any) {
		await this.reportService.getData(event);
		Utils.cleanInput(this.fileImported);
	}

	selectData(data: any[], detailTitle: string) {
		this.detailSelected = detailTitle;
		this.selectedData = data;
		this.selectedData.sort((a: any, b: any) => a[HeadersToCheck.OWNER] < b[HeadersToCheck.OWNER] ? -1 : 1)
	}
}