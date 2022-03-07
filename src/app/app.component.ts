import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import generos from './data/generos.json';
import nacionalidades  from './data/nacionalidades.json';

import clubes from './data/clubes.json';
import { ThisReceiver } from '@angular/compiler';
import jsPDF from 'jspdf';
import html2canvas  from 'html2canvas';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  

  ngOnInit(): void {
    this.comparafecha;
  }
  
  //Generacion de mi PDF del step 3
   generarPDF(){
      const DATA: any = document.getElementById('htmlData');
      const doc = new jsPDF('p', 'pt', 'a4');
      const options={
        background : 'white',
        scale: 3
      };
      html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        const bufferX =15;
        const bufferY =15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth()-2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        
        return doc;
      })
      .then((docResult)=>{
        docResult.save(`Credencial.pdf`);
      });
     
   }
   //Variables de grupos para los datos
  userForm!: FormGroup;
  generoSeleccionado: string  = "0"; // Iniciamos
  verSeleccion: string        = '';
  visualizacion: boolean = false;

  comparafecha(){
    this.userForm.value.FechaNac;
    console.log(this.userForm.value.FechaNac)
  }
  
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.generoSeleccionado;
}

  generosList: {id:number, nombre: string}[]=generos;
  nacionalidadesList: {id:number, nombre: string, continente: string}[]=nacionalidades;
  clubesList: {id:number, nombre:string, logo:string}[]=clubes;

  constructor(private fb: FormBuilder) {
    this.initForms();
    
  }
  

  initForms() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      ApeMat: ['',[Validators.required, Validators.minLength(5)]],
      FechaNac: ['',Validators.required],
      Genero: [''],
      Nacionalidad: [''],
      Club: [''],
      RFC:['', Validators.minLength(13)],
      Ocupacion: ['', [Validators.required, Validators.minLength(5)]],
    });
  
  }

  get invalidFirstname() {
    return this.userForm?.get('firstName')?.invalid && this.userForm?.get('firstName')?.touched;
  }

  get invalidLastname() {
    return this.userForm.get('lastName')?.invalid && this.userForm.get('lastName')?.touched;
  }

  get invalidApeMat(){
    return this.userForm.get('ApeMat')?.invalid && this.userForm.get('ApeMat')?.touched;
  }

  get invalidFechaNac(){
    return this.userForm.get('FechaNac')?.invalid && this.userForm.get('FechaNac')?.touched;
  }

  get invalidGenero(){
    return this.userForm.get('Genero')?.invalid && this.userForm.get('Genero')?.touched;
  }

  get invalidRFC(){
    return this.userForm.get('RFC')?.invalid && this.userForm.get('RFC')?.touched;
  }

  get invalidOcupacion(){
    return this.userForm.get('Ocupacion')?.invalid && this.userForm.get('Ocupacion')?.touched;
  }
}
