/**Copyright 2016 Sven Loesekann

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanySite } from '../model/company-site';
import { GraphqlService, GraphqlOptions } from './graphql.service';

@Injectable()
export class CompanySiteService {

	constructor(private graphqlService: GraphqlService) { }

	public findById(id: number): Observable<CompanySite> {
		const options = { operationName: 'getCompanySiteById', query: 'query getCompanySiteById($id: ID!) { getCompanySiteById(id: $id) { id, title, atDate, polygons {       id, fillColor, borderColor, title, longitude, latitude,rings{ id, primary,locations { id, longitude, latitude }}}}}', variables: { 'id': id } } as GraphqlOptions;
		return this.graphqlService.query<CompanySite>(options).pipe(map(config => {			
		   const result = (config as unknown as any)[options.operationName];
		   console.log(result);
		   return result;
		}));
	}

	public findByTitleAndYear(title: string, year: number): Observable<CompanySite[]> {
		const options = { operationName: 'getCompanySiteByTitle', query: 'query getCompanySiteByTitle($title: String!, $year: Long!) { getCompanySiteByTitle(title: $title, year: $year) { id, title, atDate, polygons { id, fillColor, borderColor, title, longitude, latitude,rings{ id, primary,locations { id, longitude, latitude}}}}}', variables: { 'title': title, 'year': year } } as GraphqlOptions;
		return this.graphqlService.query<CompanySite[]>(options).pipe(map(config => {			
		   const result = (config as unknown as any)[options.operationName];
		   console.log(result);
		   return result;
		}));
	}

	public upsertCompanySite(companySite: CompanySite): Observable<CompanySite> {
		const options = { operationName: 'getMainConfiguration', query: 'query getMainConfiguration {getMainConfiguration {mapKey}}' } as GraphqlOptions;
		return this.graphqlService.mutate<CompanySite>(options);
	}

	public resetDb(): Observable<boolean> {
		const options = { operationName: 'getMainConfiguration', query: 'query getMainConfiguration {getMainConfiguration {mapKey}}' } as GraphqlOptions;
		return this.graphqlService.mutate<void>(options);
	}

	public deletePolygon(companySiteId: number, polygonId: number): Observable<boolean> {
		const options = { operationName: 'getMainConfiguration', query: 'query getMainConfiguration {getMainConfiguration {mapKey}}' } as GraphqlOptions;
		return this.graphqlService.mutate<CompanySite>(options);
	}
}
