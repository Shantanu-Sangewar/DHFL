import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpEvent,
	HttpHeaders,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse,
	HttpHandler,
	HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	private requests: HttpRequest<any>[] = [];

	constructor(
		private router: Router,
	) {

	}

	/**
	 * 
	 * @param req - parameter to handle http request
	 * @param next - parameter for http handler
	 */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


		this.requests.push(req);
		//this.commonService.isLoading.next(true);

		return Observable.create(observer => {
			const subscription = next.handle(req)
				.subscribe(
					event => {
						if (event instanceof HttpResponse) {
							this.removeRequest(req);
							observer.next(event);
						}
					},
					err => {
						this.removeRequest(req);
						observer.error(err);

						if (err instanceof HttpErrorResponse) {

							switch (err.status) {
								case 0:

									break;
								case 400:
									break;
								case 401:
									break;
								case 404:
									break;
								case 500:
								
								default:
									break;
							}
						}

					},
					() => { this.removeRequest(req); observer.complete(); });
			// teardown logic in case of cancelled requests
			return () => {
				this.removeRequest(req);
				subscription.unsubscribe();
			};
		});
	}


	/**
	 * This method is use to check whether request are running or not
	 * @param req - Http request
	 */
	removeRequest(req: HttpRequest<any>) {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);

		}
		//this.commonService.isLoading.next(this.requests.length > 0);
	}


}