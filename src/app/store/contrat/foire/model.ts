import { TypeDuree } from '../enum/model';
import {Police} from '../police/model';

export interface Foire {
	id?: string;
	question?: string;
	reponse?: string;
}



export interface FoireList {
    foireDtoList?: Array<Foire>;
}