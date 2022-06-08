import { Component, VERSION } from '@angular/core';

//import Swal from 'sweetalert2'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  salert() {
    prompt(
      'Successfully completed the Course. If you have any feedback, you can type it below.'
    );
  }
  /*simpleAlert() {
    Swal.fire({
      title: 'Successfully Submitted the Course',
      text: 'Do you want to continue',
      confirmButtonText: 'Ok',
    });
  }*/
}
