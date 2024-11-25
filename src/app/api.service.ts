import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppSettings} from './globals';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
	providedIn: 'root'
})
export class ApiService{
	constructor(private http: HttpClient) {}

	post(target: string, data: any) {
		return this.http.get(AppSettings.API_URL + target,data);
	}

	get(target: string) {
		return this.http.get(AppSettings.API_URL + target);
	}

}
