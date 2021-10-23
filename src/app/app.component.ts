import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpserviceService } from './httpservice.service';
import * as patterns from './patterns';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'REST-pilot';
  loading = false;
  requestForm: FormGroup;
  error = '';
  response: any;
  success: any = false;
  isError: any = false;
  requestHeaders: any = '{}';
  requestBody: any = '{}';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpserviceService
  ) {
    this.requestForm = formBuilder.group({
      hostAddress: ['', [Validators.required]],
      endpoint: ['', Validators.required],
      method: ['get', Validators.required],
      headers: [''],
      body: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.requestForm.valid) {
      const formResponse = this.requestForm.value;
      const method = formResponse.method;
      const endPoint = this.prepareEndpoint();
      const headers = formResponse.headers
        ? JSON.parse(formResponse.headers)
        : '';
      const body = formResponse.body ? JSON.parse(formResponse.body) : '';
      this.prepareRequest(endPoint, method, headers, body).subscribe(
        (response: any) => {
          this.loading = false;
          this.response = JSON.stringify(response);
          this.prettyTextArea();
          this.error = '';
        },
        (error) => {
          this.loading = false;
          this.error = error;
          this.response = '';
          console.error('Error', error);
        }
      );
    } else {
      this.loading = false;
      this.response = '';
      this.error = 'Request details entered is invalid';
    }
  }

  prepareRequest(endpoint, method, headers?, params?) {
    if (method == 'get') {
      return this.http.get(endpoint, headers, params);
    } else if (method == 'post') {
      return this.http.post(endpoint, params, headers);
    } else if (method == 'put') {
      return this.http.put(endpoint, params, headers);
    } else if (method == 'delete') {
      return this.http.delete(endpoint, headers, params);
    } else {
      return this.http.get(endpoint, headers, params);
    }
  }

  prepareEndpoint() {
    let hostAddress = this.requestForm.value['hostAddress'];
    let endpoint = this.requestForm.value['endpoint'];
    hostAddress =
      hostAddress.charAt(hostAddress.length - 1) == '/'
        ? hostAddress.substring(0, hostAddress.length - 1)
        : hostAddress;
    if (endpoint.charAt(0) == '/') {
      return hostAddress + endpoint;
    } else {
      return hostAddress + '/' + endpoint;
    }
  }

  prettyTextArea(event?) {
    if (event && event.keyCode != 187) {
      return;
    }

    let regex = /\=(?!\s*?[\{\[\"\'\w])/g;

    let parsedObject = {};
    this.response = this.response.replace(regex, '');
    parsedObject = JSON.parse(this.response);
    this.response = JSON.stringify(parsedObject, undefined, 4);
  }

  formatHeadersAndBody(type, event) {
    event.preventDefault();
    // if (event && event.keyCode != 187) {
    //   console.log("returning")
    //   return;
    // }

    let regex = /\=(?!\s*?[\{\[\"\'\w])/g;
    try {
      if (type == 'headers') {
        let parsedObject = {};
        this.requestHeaders = this.requestHeaders.replace(regex, '');
        parsedObject = JSON.parse(this.requestHeaders);
        this.requestHeaders = JSON.stringify(parsedObject, undefined, 4);
      }
      if (type == 'body') {
        let parsedObject = {};
        this.requestBody = this.requestBody.replace(regex, '');
        parsedObject = JSON.parse(this.requestBody);
        this.requestBody = JSON.stringify(parsedObject, undefined, 4);
      }
      this.error = ""
    } catch (error) {
      this.error = "In formatting\n" + error
      this.response = ""
    }
    
  }
}
