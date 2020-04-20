import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Busquedas } from './../../interface/busquedas';
import { Token } from '../../interface/token';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
forma:FormGroup;
 artistas: any;
 loading: boolean;
 config: any;
 busquedas:string;
 bandera:number;
 bal:boolean=true;
 bal2:boolean=true;
 bal3:boolean=true;
 yExt:number=1;
 historial:Busquedas[]=[];
 aux:Busquedas[]=[];
 controlHistorial:boolean=false
 token:Token;
idToken:string;

constructor( private spotify: SpotifyService,
             private router: Router,
             private _builder: FormBuilder) { 
              this.forma=this._builder.group({
                tipo: ['',Validators.required],
                cantidad: ['', Validators.required],
                clave: ['', Validators.required]
                })  
            
  if(localStorage.getItem('busquedas')){
    this.historial= JSON.parse(localStorage.getItem('busquedas'));
    this.controlHistorial=true;
  }

  //recupero token del api y lo guardo en localstorage
  this.spotify.getObtenerToken()
  .subscribe( data => {
  localStorage.setItem('token',JSON.stringify (data));
  });
  //recupero token de local storage
  this.token= JSON.parse(localStorage.getItem('token'));
  this.idToken=this.token.access_token;
  console.log(this.idToken);
  //enviar el token al servicio 
  this.spotify.grabarToken(this.idToken);
  }

 
//gets para validar los campos
  get tipoNoValido(){
    return this.forma.get('tipo').invalid && this.forma.get('tipo').touched
  }
  get cantidadNoValido(){
    return this.forma.get('cantidad').invalid && this.forma.get('cantidad').touched
  }
  get claveNoValido(){
    return this.forma.get('clave').invalid && this.forma.get('clave').touched
  }
//Funciones

 //Valida las busquedas, corrobora que se cumplan las 3 entradas 
  validarBusqueda(clave:string, tipo:string, cantidad:string){
    if(clave!= ''){this.bal=false;}
    else{this.bal=true;}
    if(tipo!= '0'){this.bal2=false;}
    else{this.bal2=true;}
    if(cantidad!= '0'){this.bal3=false;}
    else{this.bal3=true;}
  }



//invoca la validacion y busca los elementos en 
  buscar(clave:string,tipo:string,cantidad:string){  
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
      control.markAsTouched();
    });
    }
    this.validarBusqueda(clave,tipo,cantidad);
          if(clave != '' && cantidad != '' ){
            this.historialNuevo(clave,tipo,cantidad);
                      if(tipo === 'artist') {                                    
                            this.spotify.getArtista( clave, tipo, cantidad )
                            .subscribe( ( data:any ) => {
                            this.artistas=data;
                            this.config = {itemsPerPage: 9,currentPage: 1,totalItems: this.artistas.count};
                            });
                            this.loading=false;
                            }
                      if(tipo==='album'){                            
                            this.spotify.getAlbum( clave, tipo, cantidad )
                            .subscribe( ( data:any ) => {
                            this.artistas=data;
                            this.config = {itemsPerPage: 9,currentPage: 1,totalItems: this.artistas.count};
                            });
                            this.loading=false;
                            }
                        if(tipo==='track'){                          
                          this.spotify.gettrack( clave, tipo, cantidad )
                          .subscribe( ( data:any ) => {
                            this.artistas=data;
                            this.config = {itemsPerPage: 9,currentPage: 1,totalItems: this.artistas.count};
                            });
                            this.loading=true;
                            }          
          }
        }
//muestra artista, album o track
        verArtista(item:any){
          let id;
          if( item.type === 'artist'){
            id=item.id;
            this.router.navigate(['/artista', id])
          }
          if (item.type === 'album'){
            id=item.id;
            this.router.navigate(['/album', id])
          }
          if( item.type === 'track'){
            id=item.id;
            console.log(id);
            this.router.navigate(['/track', id])
          } 
          }
//paginador
          pageChanged(event){
            this.config.currentPage = event;
          };

//Historial
      
 
historialNuevo(clave:string,tipo:string,cantidad:string){
    const nuevaBusqueda = new Busquedas(tipo,cantidad,clave);
    this.historial.unshift(nuevaBusqueda);
    if(this.historial.length>10){
      let x:number;
      for (x=0; x<10; x++){
        this.aux[x]=this.historial[x];

      }
      localStorage.setItem('busquedas', JSON.stringify(this.aux));
      this.historial= JSON.parse(localStorage.getItem('busquedas'));
    }
    else{
      localStorage.setItem('busquedas', JSON.stringify(this.historial))
    }
    console.log(this.aux);
    
    console.log(nuevaBusqueda);    

};


}
