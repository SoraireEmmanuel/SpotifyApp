import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent  {

  artista:any={};
  topTracks:any[]=[];
  constructor( private router:ActivatedRoute,
               private spotify:SpotifyService,
               private routers:Router) { 
    this.router.params.subscribe( params => {
    console.log(params['id']);
      this.verArtista(params['id']);
      this.getEscucharTrack(params['id']);  
    })


  }
verArtista(id:string){
  this.spotify.getVerArtista( id )
  .subscribe(data => {
    console.log(data);
    this.artista=data;
  });
}
getEscucharTrack(id:string){
  this.spotify.getTopTracks(id)
  .subscribe(data => {
    console.log(data);
    this.topTracks=data;
  });
}
compartir(info:string){
  this.routers.navigate(['/compartir', info])

}



}
