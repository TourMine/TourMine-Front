export enum EPlataforms {
    PC = 1,
    PS4 = 2,
    PS5 = 3,
    XBOX_ONE = 4,
    XBOX_SERIES = 5,
    SWITCH = 6,
    MOBILE = 7
}
  
export const PLATAFORMS_LABELS: Record<EPlataforms, string> = {
    [EPlataforms.PC]: "PC",
    [EPlataforms.PS4]: "PS4",
    [EPlataforms.PS5]: "PS5",
    [EPlataforms.XBOX_ONE]: "Xbox One",
    [EPlataforms.XBOX_SERIES]: "Xbox Series",
    [EPlataforms.SWITCH]: "Switch",
    [EPlataforms.MOBILE]: "Mobile"
};