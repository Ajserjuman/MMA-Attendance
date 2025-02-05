import { Component ,NgModule,OnInit} from '@angular/core';
//import { IonHeader, IonToolbar, IonRow,IonTitle, IonContent,IonButton, IonButtons, IonMenu,IonMenuButton,IonProgressBar,IonSegment,IonSegmentButton,IonLabel,IonList,IonItem,IonSelect,IonSelectOption,IonCheckbox,IonIcon} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../data.service';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,IonicModule],
})
export class SignupComponent  implements OnInit {

  constructor(private router: Router, private service : DataService, private toastController: ToastController) { }

  imageLoaded = false;
  spinner:boolean = true;
  signup = new UntypedFormGroup({
    username : new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
    email_id: new UntypedFormControl('', Validators.required),
  });


  routeTo()
  {
    this.spinner = true;
    this.router.navigate(['/login']);
    this.spinner = false;
  }

  
  signUp() {
    this.spinner = true;
    const usernameControl = this.signup.get('username');
    const passwordControl = this.signup.get('password');
    const emailControl = this.signup.get('email_id');

    if (usernameControl && passwordControl && emailControl) {
      const data = {
        username: usernameControl.value,
        password: passwordControl.value,
        email_id: emailControl.value,
      };
      this.service.signup(data).subscribe(
      response => {
        console.log('Response from server:', response);
        // Parse JSON response
        const jsonResponse = JSON.parse(JSON.stringify(response));
        // if(jsonResponse.data && jsonResponse.data.length == 1)
        // {
            this.spinner = true;
            this.showtoastMessage(jsonResponse.message,'bottom');
            if(jsonResponse.message == 'SignUp success')
            {
                this.routeTo();
            }
            this.spinner = false;
            
        // }
        // else
        // {
        //   this.showtoastMessage('Unsuccessfull, Please Try again later','bottom');
        // }
        console.log('Parsed JSON:', jsonResponse);
      },
      error => {
        //console.error('Error:', error);
        this.showtoastMessage('Unsuccessfull at this moment','bottom');
        this.spinner = false;
      }
      );
    } else {
      console.error('Unsuccessfull');
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

  goBack()
  {
    this.router.navigate(['/login']);
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
