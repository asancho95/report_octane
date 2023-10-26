import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Actions } from 'src/app/models/actions.enum';
import { getCurrentConfig } from 'src/app/models/config.const';
import { Configuration, KeysText, ProjectConfiguration } from 'src/app/models/config.model';
import { ConfigService } from 'src/app/services/config.service';
import { ToastService } from 'src/app/services/toast.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

	config: Actions = Actions.IMPORT;
	projectName?: string;
	selectedProject?: string;
	list: ProjectConfiguration[] = [];
	selectedConfigurationName: string = this._configService.currentConfigName;
	selectedConfiguration: Configuration = getCurrentConfig();
	fileImported: boolean = false;
    @ViewChild('configImported') configImported?: ElementRef;

	get headers(): string[] {
		return Object.keys(this.selectedConfiguration);
	}

	get dataSource() {
		return new MatTableDataSource([this.selectedConfiguration]);
	}

	get Actions() {
		return Actions;
	}

	get KeysText() {
		return KeysText;
	}

	constructor(private _configService: ConfigService, private _toastService: ToastService) { }

	ngOnInit(): void {
		this.refreshList();
	}

	refreshList() {
		this.list = this._configService.getConfigurationsList().filter((projectConf: ProjectConfiguration) => projectConf.name !== this._configService.currentConfigName);
	}

	configSelected(event: any) {
		this._configService.setData(event).then((obj: Configuration) => {
			this.selectedConfiguration = obj;
			this.fileImported = true;
		});
	}

	saveConfig() {
		if(this.projectName && this.projectName !== "" && this.configImported?.nativeElement.value) {
			this._configService.updateConstants(this.selectedConfiguration);
			this._configService.saveConfig(this.projectName);
			Utils.cleanInput(this.configImported);
			this.fileImported = false;
			this._configService.setLastSelectedConfig(this.projectName);
			this.refreshList();
			this.projectName = undefined;
		} else {
			this._toastService.error("Error", "Tienes que introducir un nombre e importar un archivo");
		}
	}

	loadConfig() {
		if(this.selectedProject) {
			this.selectedConfiguration = this._configService.loadConfig(this.selectedProject) ?? getCurrentConfig();
			this._configService.setLastSelectedConfig(this.selectedProject);
			this.refreshList();
		} else {
			this._toastService.error("Error", "Tienes que seleccionar una configuración");
		}
	}

	deleteConfig() {
		if(this.selectedProject) {
			this._configService.deleteConfig(this.selectedProject);
			this.selectedConfigurationName = this._configService.currentConfigName;
			this.selectedConfiguration = getCurrentConfig();
			this.refreshList();
		} else {
			this._toastService.error("Error", "Tienes que seleccionar una configuración");
		}
	}

	applyLoadedConfig() {
		if(this.selectedConfiguration) {
			this._configService.updateConstants(this.selectedConfiguration);
		} else {
			this._toastService.error("Error", "Error al cargar la configuración");
		}
	}

	refreshTable() {
		switch(this.config) {
			case Actions.IMPORT:
				this.selectedConfiguration = getCurrentConfig();
				break;
			case Actions.LOAD:
			case Actions.DELETE:
				if(this.selectedProject) {
					this.loadConfig();
				}
				break;
		}
	}
}
