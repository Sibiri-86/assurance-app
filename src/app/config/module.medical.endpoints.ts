export const SERVICE_PREFIX = `/medical`;

export class EndpointsMedical {
    static readonly BONPRISEENCHARGE = {
        prod: `${SERVICE_PREFIX}/parametrage/typeGarantie`,
        mock: `assets/mock/parametrage/typegarantie.mock.json`
    };
}