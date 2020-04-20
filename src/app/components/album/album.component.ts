import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

import { Router } from '@angular/router'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent   {
  album:any;
  tracks:any;
  aux:any;
  constructor(private router:ActivatedRoute,
    private spotify:SpotifyService,
    private routers:Router) {
      this.router.params.subscribe( params => {
        console.log(params['id']);
          this.verAlbum(params['id']);
          this.getEscucharTrack(params['id']);
        })
    
     }
     verAlbum(id:string){
      this.spotify.getVerAlbum( id )
      .subscribe(data => {
        console.log(data);
        this.album=data;
      });
      this.spotify.getRecArtista( id )
      .subscribe(data => {
        console.log(data);
        this.aux=data;
      });
      
     }
     getEscucharTrack(id:string){
      this.spotify.getAlbumTracks(id)
      .subscribe(data => {
        console.log(data);
        this.tracks=data;
      });
    }
    
compartir(info:string){
  this.routers.navigate(['/compartir', info])

}

}
