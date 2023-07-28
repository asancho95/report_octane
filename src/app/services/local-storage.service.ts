import { Injectable } from '@angular/core';
import { Configuration, ProjectConfiguration } from '../models/config.model';
import { getCurrentConfig } from '../models/config.const';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	private _lastConfig: string = 'lastConfig';
	private _parentObjectName: string = "configurations";
	private _projectList: ProjectConfiguration[] = [];

	getConfigurationList(): ProjectConfiguration[] {
		const obj: string | null = localStorage.getItem(this._parentObjectName);
		if(obj) {
			this._projectList = (JSON.parse(obj) as ProjectConfiguration[]) ?? [];
		} else {
			this._projectList = [];
		}
		return this._projectList;
	}

	getLastConfig(): Configuration | undefined {
		const lastConfigName: string | null = localStorage.getItem(this._lastConfig);
		if(lastConfigName) {
			return this.getConfigurationByName(lastConfigName)?.configuration;
		} else {
			const name: string = "Por defecto";
			const config: Configuration = getCurrentConfig();
			this.setLastSelectedConfig(name);
			this.addConfiguration(name, config);
			return config;
		}
	}

	getConfigurationByName(name: string): ProjectConfiguration | undefined {
		return this._projectList.find((conf: ProjectConfiguration) => conf.name === name);
	}
	
	addConfiguration(name: string, configuration: Configuration) {
		let projectConf: ProjectConfiguration | undefined = this.getConfigurationByName(name);
		if(projectConf) {
			projectConf.configuration = configuration;
		} else {
			this._projectList.push({name: name, configuration: configuration});
		}
		this.overrideConfigurations();
	}

	removeConfiguration(name: string) {
		let index: number = this._projectList.findIndex((conf: ProjectConfiguration) => conf.name === name);
		if(index >= 0) {
			this._projectList.splice(index, 1);
		}
		this.overrideConfigurations();
	}

	overrideConfigurations() {
		localStorage.setItem(this._parentObjectName, JSON.stringify(this._projectList));
	}

	setLastSelectedConfig(name: string) {
		localStorage.setItem(this._lastConfig, name);
	}

	getLastSelectedConfigName() {
		return localStorage.getItem(this._lastConfig);
	}
}
