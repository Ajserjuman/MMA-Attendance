import { Component ,NgModule} from '@angular/core';
//import { IonHeader, IonToolbar, IonRow,IonTitle, IonContent,IonButton, IonButtons, IonMenu,IonMenuButton,IonProgressBar,IonSegment,IonSegmentButton,IonLabel,IonList,IonItem,IonSelect,IonSelectOption,IonCheckbox,IonIcon} from '@ionic/angular/standalone';
import { DataService, userdata } from '../data.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { search } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { personCircle,accessibility,accessibilityOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

addIcons({
  accessibility,
  accessibilityOutline,
  personCircle
  // Add all other icons you want here
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,IonicModule],
})
export class HomePage {
  searIcon = search;
  spinner:boolean = true;
  constructor(private service:DataService,private http: HttpClient) {
    this.service.fetchData().subscribe(
      (res)=>{
        console.log(res);
      },
      (error)=>{
        console.log('error');
      }
    );
    //this.submitData();
  }

  ngOnInit() {
    this.spinner = false;
    console.log(this.service.myConfig);
  }


  form = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    CREATED_BY: new UntypedFormControl(''),
  })

  markedFood:any[] = [{
    breakfast:null,
    lunch: "Y",
    dinner: "Y"
}]

  today = new UntypedFormGroup({
    breakfast:new UntypedFormControl(''),
    lunch:new UntypedFormControl(''),
    dinner:new UntypedFormControl('')
  });

  tommarow = new UntypedFormGroup({
    breakfast:new UntypedFormControl(false),
    lunch:new UntypedFormControl(false),
    dinner:new UntypedFormControl(false)
  });

  check():void
  {
    console.log(this.tommarow.value);
  }

  check1(food:string)
  {
    if(this.markedFood[0][food] == null)
      {
        console.log('Fine');
      }

    console.log(this.today.value);
  }

  selectedSegment: string = 'Today';

  select(event: CustomEvent): void {
    this.selectedSegment = event.detail.value;
  }

  option:any[]= ['Breakfast','Lunch','Dinner'];

  selectedFoodForTommarow:string[] = [];

  onSelectionChange(event:any) {
    //this.selectedFoodForTommarow = event.detail.value;
    console.log(this.tommarow);
  }


  // submitData(){
  //   console.log('hii');
  //   //this.service.postData({email_id : 'ajser', password : 'asdasd',username:'jaba'});
  //   const data = { email_id: 'ajser', password: 'asdasd', username: 'jaba' };
  //   this.http.post('http://localhost:3000/insert', data).subscribe(
  //     response => {
  //       console.log('Response from server:', response);
  //     },
  //     error => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  

  submitData() {
    const data = { email_id: 'olakka', password: 'cherakka', username: 'korakka' };
    this.service.insertData(data).subscribe(
      response => {
        console.log('Response from server:', response);
        // Parse JSON response
        const jsonResponse = JSON.parse(JSON.stringify(response));
        console.log('Parsed JSON:', jsonResponse);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
