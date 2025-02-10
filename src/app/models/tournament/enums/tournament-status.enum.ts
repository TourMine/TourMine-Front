export enum ETournamentStatus {
    Planning = 1,
    Open = 2,
    InProgress = 3,
    Finished = 4
}

export const TOURNAMENT_STATUS_LABELS: Record<ETournamentStatus, string> = {
    [ETournamentStatus.Planning]: "Planejamento",
    [ETournamentStatus.Open]: "Aberto",
    [ETournamentStatus.InProgress]: "Em andamento",
    [ETournamentStatus.Finished]: "Finalizado",
};