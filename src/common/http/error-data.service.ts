import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorDataService {
  constructor() {}

  public handleError(error: AxiosError) {
    // Customize error handling as per your requirements
    // For example, you can log the error or perform other actions
    console.error('HTTP Request Error:', error.message);
    return throwError(
      () => new Error('Something went wrong with the HTTP request.'),
    );
  }
}
