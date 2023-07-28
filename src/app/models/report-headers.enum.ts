export const HEADERS = ["ID", "Release", "Sprint", "Remaining hours", "Estimated hours", "Invested hours", "Has attachments", "Tags", "Blocked", "Priority", "Feature", "Name", "Description", "Phase", "Progress", "Story points", "Team", "Fixed in build", "Creation time", "Blocked reason", "Linked items1", "Author", "Last modified", "Owner", "Type"];
export const REPORT_HEADERS = ["Ciclo", "Sprint", "Sin estimar", "Con ETC", "Sin incurrir", "Abiertas", "Sin asignado", "Estimado vs incurrido", "Bugs", "Ceremonias", "Eficiencia"];
export const DETAIL_HEADERS = ["ID", "Feature", "Team", "Tags", "Name", "Owner", "Story points", "Remaining hours", "Estimated hours", "Invested hours", "Phase"]
export const EFFICIENY_HEADERS = ["Tareas sin sprint", "Eficiencia"]
export const TEAM_EFICIENCY_HEADERS = [
    {
        name: "member",
        text: "Persona"
    },
    {
        name: "doneOrClosed",
        text: "Tareas finalizadas"
    },
    {
        name: "eficiency",
        text: "Eficiencia"
    }
]

export enum HeadersToCheck {
    CICLO = "Release",
    SPRINT = "Sprint",
    NAME = "Name",
    ESTIMATED = "Estimated hours",
    REMAINING = "Remaining hours",
    INVESTED = "Invested hours",
    PHASE = "Phase",
    OWNER = "Owner",
    TYPE = "Type"
}

export enum ReportHeaders {
    CICLO = "Ciclo", 
    SPRINT = "Sprint",
    NO_ESTIMATED = "Sin estimar", 
    WITH_REMAINING_HOURS = "Con ETC", 
    NO_INVESTED = "Sin incurrir", 
    OPENED = "Abiertas", 
    NO_ASIGNED = "Sin asignado",
    ESTIMATED_VS_INVESTED = "Estimado vs incurrido", 
    BUGS = "Bugs", 
    CEREMONIES = "Ceremonias", 
    EFICIENCY = "Eficiencia"
}