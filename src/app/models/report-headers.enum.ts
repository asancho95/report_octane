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

export const COLUMNS: any = {
    "A1": HEADERS[0],
    'B1': HEADERS[1],
    'C1': HEADERS[2],
    'D1': HEADERS[3],
    'E1': HEADERS[4],
    'F1': HEADERS[5],
    'G1': HEADERS[6],
    'H1': HEADERS[7],
    'I1': HEADERS[8],
    'J1': HEADERS[9],
    'K1': HEADERS[10],
    'L1': HEADERS[11],
    'M1': HEADERS[12],
    'N1': HEADERS[13],
    'O1': HEADERS[14],
    'P1': HEADERS[15],
    'Q1': HEADERS[16],
    'R1': HEADERS[17],
    'S1': HEADERS[18],
    'T1': HEADERS[19],
    'U1': HEADERS[20],
    'V1': HEADERS[21],
    'W1': HEADERS[22],
    'X1': HEADERS[23],
    'Y1': HEADERS[24]
}

export enum HeadersToCheck {
    CICLO = "Release",
    SPRINT = "Sprint",
    BACKLOG_ITEM = "Backlog item: ",
    NAME = "Name",
    ESTIMATED = "Estimated hours",
    REMAINING = "Remaining hours",
    INVESTED = "Invested hours",
    PHASE = "Phase",
    STATUS = "Status",
    OWNER = "Owner",
    ASSIGNED = "Assigned",
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