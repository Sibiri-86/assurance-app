import { TypeDuree } from '../enum/model';
import {Police} from '../police/model';

export interface Exercice {
	id?: string;
	debut?: Date;
	fin?: Date;
	police?: Police;
	deleted?: boolean;
	actived?: boolean;
	typeDuree?: TypeDuree;
	duree?: number,
	nomExo?:string,
	numero?: number
}



export interface User {
	userName?: string;
    emailId?: string;
    password?: string;
    firstname?: string;
    lastName?: string;
}