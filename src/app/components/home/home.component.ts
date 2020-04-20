import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';
import { Token } from '../../interface/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

config: any;  
nuevasCanciones:  any;
loading: boolean;
artistas: any[] = [];
token:Token;
idToken:string;

  constructor( private spotify: SpotifyService, 
             private router: Router,
             ) {
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

  
  this.loading=true;
  this.spotify.getNewReleases( )
  .subscribe ((data:any )=> { 
   this.nuevasCanciones=data;
   this.config = {
    itemsPerPage: 9,
    currentPage: 1,
    totalItems: this.nuevasCanciones.count
    };
  })
  
//  this.config = {
//  itemsPerPage: 9,
//  currentPage: 1,      lo mejore metiendolo dentro del subscribe
//  totalItems: 20
//  };
}
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
  pageChanged(event){
    this.config.currentPage = event;
  }
  }






//this.spotify.getObtenerToken( )
//  .subscribe( (data:string) => {this.token=data} )
//  console.log(this.token);