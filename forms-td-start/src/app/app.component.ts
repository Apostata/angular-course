import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultSecret = "teacher";
  responseSecret = "";
  genders : string[] = ['male', 'female'];
  @ViewChild('f', {static:false}) userForm : NgForm;
  formData: {
    username: string,
    email: string,
    secret: string,
    responseSecret: string,
    gender: string
  } = {
    username : '',
    email:'',
    secret:'',
    responseSecret: '',
    gender: ''
  }
  submited: boolean = false;

  suggestUserName (){
    const suggestedUserName = 'SuperUser';
    // this.userForm.setValue({
    //   dadosUsuario:{
    //     username: suggestedUserName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   responseSecret: '',
    //   gender: 'male'
    // });

    this.userForm.form.patchValue({
      dadosUsuario:{
        username: suggestedUserName
      }
    });
  }

  onSubmit(){
    this.submited = true;
    this.formData.username = this.userForm.value.dadosUsuario.username;
    this.formData.email = this.userForm.value.dadosUsuario.email;
    this.formData.secret = this.userForm.value.secret;
    this.formData.responseSecret = this.userForm.value.responseSecret;
    this.formData.gender = this.userForm.value.gender;

    this.userForm.reset();
  }
}
