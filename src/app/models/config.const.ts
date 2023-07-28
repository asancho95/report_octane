import { Configuration } from "./config.model";

export let CEREMONIES: string[] = ["CodeReview", "Daily", "Planning", "Refinement", "Review DEMO"];
export let MIN_ESTIMATION_VS_INVESTED: number = 20;
export let ENDED_PHASES: string[] = ["Closed", "Done", "Fixed"];
export let NAME_MAIN_TYPE: string = "User Story";
export let NAME_BUG_TYPE: string = "Defect";

export function getCurrentConfig(): Configuration {
    return {
        ceremonias: CEREMONIES,
        minEstimacionVsInvertido: MIN_ESTIMATION_VS_INVESTED,
        fasesTerminadas: ENDED_PHASES,
        nombreTipoPrincipal: NAME_MAIN_TYPE,
        nombreTipoBug: NAME_BUG_TYPE
    }
}

export function setCeremonies(_newValue: string[] | undefined) {
    if(_newValue) {
        CEREMONIES = _newValue;
    }
}

export function setMinEstimatedVsInvested(_newValue: number | undefined) {
    if(_newValue) {
        MIN_ESTIMATION_VS_INVESTED = _newValue;
    }
}

export function setEndedPhases(_newValue: string[] | undefined) {
    if(_newValue) {
        ENDED_PHASES = _newValue;
    }
}

export function setNameMainType(_newValue: string | undefined) {
    if(_newValue) {
        NAME_MAIN_TYPE = _newValue;
    }
}

export function setNameBugType(_newValue: string | undefined) {
    if(_newValue) {
        NAME_BUG_TYPE = _newValue;
    }
}
