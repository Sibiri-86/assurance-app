export const SERVICE_PREFIX = `/medical`;

export class EndpointsMedical {
    static readonly BONPRISEENCHARGE = {
        prod: `${SERVICE_PREFIX}/bonPriseEnCharge`,
        mock: `assets/mock/bonPriseEnCharge.mock.json`
    };
}
