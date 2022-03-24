export const SERVICE_PREFIX = `/assurance/medical`;

export class EndpointsMedical {
    static readonly BONPRISEENCHARGE = {
        prod: `${SERVICE_PREFIX}/bonPriseEnCharge`,
        mock: `assets/mock/bonPriseEnCharge.mock.json`
    };

    static readonly ORDONNANCE_MEDICALE_CREATED = {
        prod: `${SERVICE_PREFIX}/ordonnanceMedical/createOrdonnance`,
        mock: `assets/mock/ordonnanceMedical.mock.json`
    };

    static readonly ORDONNANCE_MEDICALE_LOAD = {
        prod: `${SERVICE_PREFIX}/ordonnanceMedical/getOrdonnance`,
        mock: `assets/mock/ordonnanceMedical.mock.json`
    };

    static readonly ORDONNANCE_MEDICALE_REPORT = {
        prod: `${SERVICE_PREFIX}/ordonnanceMedical/report`,
        mock: `assets/mock/ordonnanceMedical.mock.json`
    };
}
