import {AnimeScore} from "../lib/aliases";

export enum TierColor {
    S = '#ff7f7e',
    A = '#ffbf7f',
    B = '#feff7f',
    C = '#7eff80',
    D = '#7fffff',
    E = '#474786',
    F = '#ff7ffe',
    None = '#ffffff',
}

export function TierColorForAnimeScore(score: AnimeScore): TierColor {
    if (score === 0)
        return TierColor.None
    if (score == 10)
        return TierColor.S
    if (score == 9)
        return TierColor.A
    if (score == 8)
        return TierColor.B
    if (score == 7)
        return TierColor.C
    if (score >= 5)
        return TierColor.D
    if (score >= 2)
        return TierColor.E
    return TierColor.F
}