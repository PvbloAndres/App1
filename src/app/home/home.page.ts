import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Renderer2, ElementRef } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: Date | null = new Date();
  opcionSeleccionada: string = '';
  scanData:any;
  constructor(public alertController: AlertController ,
              public animationCtrl: AnimationController,
              private renderer: Renderer2,
              private firstNameInput: ElementRef,
              private lastNameInput: ElementRef,
              private barcode:BarcodeScanner) { }

  ngOnInit() {
  }
  get username(): string {
    return localStorage.getItem('usuario') || '';
  }
  
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Nombre y Apellido',
      message: `Nombre: ${this.nombre} <br> Apellido: ${this.apellido}`,
      buttons: ['OK']
    });

    await alert.present();
  }
  limpiarCampos() {
    const firstNameElement = this.firstNameInput.nativeElement;
    const firstNameAnimation = this.animationCtrl.create()
      .addElement(firstNameElement)
      .duration(1000)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0', '1');

    // Aplica la animación al input de apellido
    const lastNameElement = this.lastNameInput.nativeElement;
    const lastNameAnimation = this.animationCtrl.create()
      .addElement(lastNameElement)
      .duration(1000)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0', '1');
      firstNameAnimation.play();
      lastNameAnimation.play();
    this.nombre = '';
    this.apellido = '';
    this.opcionSeleccionada='';
    this.fechaNacimiento=null;
  }
  scan(){
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };  

    this.barcode.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanData = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
