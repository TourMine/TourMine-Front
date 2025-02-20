export enum EGames {
    FIFA = "FIFA",
    CSGO2 = "CSGO2",
    LEAGUE_OF_LEGENDS = "LEAGUE_OF_LEGENDS",
    VALORANT = "VALORANT",
    FORTNITE = "FORTNITE"
}

export const GAME_LABELS: Record<EGames, string> = {
    [EGames.FIFA]: "FIFA 23",
    [EGames.CSGO2]: "CS:GO 2",
    [EGames.LEAGUE_OF_LEGENDS]: "League of Legends",
    [EGames.VALORANT]: "Valorant",
    [EGames.FORTNITE]: "Fortnite"
};