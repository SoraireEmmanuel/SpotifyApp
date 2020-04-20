import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styles: []
})
export class CompartirComponent  {
  forma:FormGroup;
infoEnviar:any;

  constructor(private route:ActivatedRoute,
              private _builder: FormBuilder) {
      
      this.route.params.subscribe((param:any) => {
      this.infoEnviar=param;
      console.log(param)
    })

    this.forma=this._builder.group({
    destinatario: ['', Validators.compose([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required])],
    nombreyapellido: ['',Validators.required],
    asunto: ['', Validators.required],
    mensaje: [''],
    infoCom: [ '']
    })

     }

get nombreNoValido(){
  return this.forma.get('nombreyapellido').invalid && this.forma.get('nombreyapellido').touched
}
get asuntoNoValido(){
  return this.forma.get('asunto').invalid && this.forma.get('asunto').touched
}
get destinatarioNoValido(){
  return this.forma.get('destinatario').invalid && this.forma.get('destinatario').touched
}


enviar(){
console.log(this.forma);

    if(this.forma.invalid){
        return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
