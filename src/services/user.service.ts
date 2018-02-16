import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '../models/user'
import { HttpClient } from '@angular/common/http'
import 'rxjs/Rx'
export { User }

/**
 * Lets you to retrieve one user or the authenticated user.
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(private httpService: HttpClient) {}

  /**
   * Get one user
   *
   * @param {string} id Unique identifier of the user.
   * @returns {Observable<User>}
   *
   * @memberOf UserService
   */
  get(id: string): Observable<User> {
    return this.httpService.get(`/users/${id}`).map(data => User.build(data))
  }

  all(): Observable<User[]> {
    return this.httpService
      .get<any[]>('/users')
      .map(data => data.map(user => User.build(user)))
  }

  /**
   * Get the authenticated user
   *
   * @returns {Observable<User>}
   *
   * @memberOf UserService
   */
  me(): Observable<User> {
    // this.httpService.get<any>("https://httpbin.org/").subscribe()

    return this.get('me')
  }
}
