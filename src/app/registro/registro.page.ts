import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      "nombre": new FormControl("",Validators.required),
      "password": new FormControl("",Validators.required),
      "confirmacionPassword": new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }
  async guardar(){
    var f = this.formularioLogin.value;

    if(this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header:'Datos incorrectos',
        message: 'Tienes que llenar todos los datos,Recuerda que la contraseña solo acepta digitos numericos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    this.navCtrl.navigateRoot('login');
    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
  }
  
}
