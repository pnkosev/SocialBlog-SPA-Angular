import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanLoadUserService implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
