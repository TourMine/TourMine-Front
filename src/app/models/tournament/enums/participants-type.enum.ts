export enum EParticipantsType {
    SINGLE = 1,
    DUO = 2,
    SQUAD = 3
} 

export const PARTICIPANTS_TYPE_LABELS: Record<EParticipantsType, string> = {
    [EParticipantsType.SINGLE]: "Solo",
    [EParticipantsType.DUO]: "Duo",
    [EParticipantsType.SQUAD]: "Squad"
};