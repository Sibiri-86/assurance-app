import { Operation, OperationLeutree } from "./model";

export interface OperationState {
    operationList: Array<Operation>;
    operationLeutreeList: Array<OperationLeutree>;
    reportFile: ArrayBuffer;
}