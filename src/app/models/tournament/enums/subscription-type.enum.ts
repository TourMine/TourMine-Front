export enum ESubscriptionType {
    FREE = 1,
    PAID = 2
}

export const SUBSCRIPTION_TYPE_LABELS: Record<ESubscriptionType, string> = {
    [ESubscriptionType.FREE]: "Grátis",
    [ESubscriptionType.PAID]: "Pago",
};