import { Component ,NgModule,OnInit} from '@angular/core';
//import { IonHeader, IonToolbar, IonRow,IonTitle, IonContent,IonButton, IonButtons, IonMenu,IonMenuButton,IonProgressBar,IonSegment,IonSegmentButton,IonLabel,IonList,IonItem,IonSelect,IonSelectOption,IonCheckbox,IonIcon} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { DataService ,userdata} from '../data.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { search } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { personCircle,accessibility,accessibilityOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { IonToast } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,IonicModule],
})
export class LoginComponent  implements OnInit {

  constructor(private router: Router, private service : DataService, private toastController: ToastController) { }
  imageLoaded = false;
  spinner:boolean = true;
  login = new UntypedFormGroup({
    username : new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });


  routeTo()
  {
    this.spinner = true;
    this.router.navigate(['/home']);
    this.spinner = false;
  }

  signup()
  {
    this.spinner = true;
    this.router.navigate(['/signup']);
    this.spinner = false;
  }

  
  loginTo() {
    this.spinner = true;
    // const data = { userame: this.login.get('username').value, password:this.login.get('password').value };
    // this.service.login(data).subscribe(
    //   response => {
    //     console.log('Response from server:', response);
    //     // Parse JSON response
    //     const jsonResponse = JSON.parse(JSON.stringify(response));
    //     console.log('Parsed JSON:', jsonResponse);
    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );
    const usernameControl = this.login.get('username');
    const passwordControl = this.login.get('password');

    if (usernameControl && passwordControl) {
      const data = {
        username: usernameControl.value,
        password: passwordControl.value
      };
      this.service.login(data).subscribe(
      response => {
        console.log('Response from server:', response);
        // Parse JSON response
        const jsonResponse = JSON.parse(JSON.stringify(response));
        this.service.myConfig = jsonResponse.data;
        console.log(this.service.myConfig);
        if(jsonResponse.data && jsonResponse.data.length == 1)
        {
            this.spinner = true;
            this.showtoastMessage('Login Successfull','bottom');
            this.routeTo();
        }
        else
        {
          this.showtoastMessage('Incorrect username or password','bottom');
          this.spinner = false;
        }
        console.log('Parsed JSON:', jsonResponse);
      },
      error => {
        //console.error('Error:', error);
        this.showtoastMessage('Incorrect username or password','bottom');
        this.spinner = false;
      }
      );
    } else {
      console.error('Username or password control is null.');
      this.spinner = false;
    }
  }

  async showtoastMessage(message:string,position: 'top' | 'middle' | 'bottom')
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  ngOnInit() {
    const img = new Image();
    img.onload = () => {
      //this.imageLoaded = true;
      this.spinner = false;
    };
    img.src = '../../assets/icon/bg.jpg'; // Path to your background image
  }

}
