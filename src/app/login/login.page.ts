import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  
  constructor(public fb: FormBuilder,public alertController: AlertController,public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      "nombre": new FormControl("",Validators.required),
      "password": new FormControl("",Validators.required)
    });
  }
  

  ngOnInit() {
  }
  async ingresar(){
    var f = this.formularioLogin.value;

    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
    var usuario = JSON.parse(usuarioString);
    } else {
      console.log('Error')
      }

    if(usuario.nombre == f.nombre && usuario.password == f.password){
      const alert = await this.alertController.create({
        header:'Datos Correctos',
        message: 'Los datos que ingresaste son correcto',
        buttons: ['Iniciar']
        
      });
      this.navCtrl.navigateRoot('home') ;
      localStorage.setItem('usuario',usuario.nombre);
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header:'Datos Incorrectos',
        message: 'Los datos que aceptaste no son correctos',
        buttons : ['Aceptar']
      });
      await alert.present();
    }
  }
}
