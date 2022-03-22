export const SERVICE_PREFIX = `/medical`;

export class EndpointsMedical {
    static readonly BONPRISEENCHARGE = {
        prod: `${SERVICE_PREFIX}/bonPriseEnCharge`,
        mock: `assets/mock/bonPriseEnCharge.mock.json`
    };

    static readonly ORDONNANCE_MEDICALE_CREATED = {
        prod: `${SERVICE_PREFIX}/ordonnanceMedical/createOrdonnance`,
        mock: `assets/mock/ordonnanceMedical.mock.json`
    };
}
