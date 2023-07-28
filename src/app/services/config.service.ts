import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import { Configuration, ProjectConfiguration } from '../models/config.model';
import { getCurrentConfig, setCeremonies, setEndedPhases, setMinEstimatedVsInvested, setNameBugType, setNameMainType } from '../models/config.const';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	get currentConfigName(): string {
		return this._localStorageService.getLastSelectedConfigName() ?? '';
	}

	constructor(private _localStorageService: LocalStorageService) { }

	startApp() {
		this._localStorageService.getConfigurationList();
		const config: Configuration | undefined = this._localStorageService.getLastConfig();
		if(config) {
			this.updateConstants(config);
		}
	}

	async setData(event: any) {
		return new Promise<Configuration>((resolve, reject) => {
			let fileReader: FileReader = Utils.uploadConfig(event);
			let jsonObj: Configuration = {};
			fileReader.onload = () => {
				jsonObj = (JSON.parse(fileReader.result?.toString() ?? ''));
				resolve(jsonObj);
			}
			fileReader.onerror = (error) => {
				console.log(error);
				reject({});
			}
		})
	}

	updateConstants(json: Configuration) {
		setCeremonies(json.ceremonias);
		setMinEstimatedVsInvested(json.minEstimacionVsInvertido);
		setEndedPhases(json.fasesTerminadas);
		setNameMainType(json.nombreTipoPrincipal);
		setNameBugType(json.nombreTipoBug);
	}

	getConfigurationsList(): ProjectConfiguration[] {
		return this._localStorageService.getConfigurationList();
	}

	saveConfig(name: string) {
		this._localStorageService.addConfiguration(name, getCurrentConfig())
	}

	loadConfig(name: string) {
		return this._localStorageService.getConfigurationByName(name)?.configuration;
	}

	deleteConfig(name: string) {
		return this._localStorageService.removeConfiguration(name);
	}

	setLastSelectedConfig(name: string) {
		this._localStorageService.setLastSelectedConfig(name);
	}
}
