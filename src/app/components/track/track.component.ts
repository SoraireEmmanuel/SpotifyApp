import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent  {
track:any;
  constructor(private router:ActivatedRoute,
    private spotify:SpotifyService,
    private routers:Router
    ) {
      
      this.router.params.subscribe( params => {
      console.log(params['id']);
      this.verTrack(params['id']);
        })

     }
     verTrack(id:string){
      this.spotify.getVerTrack( id )
      .subscribe(data => {
        console.log(data);
        this.track=data;
      });

     }

 
     compartir(info:string){
      this.routers.navigate(['/compartir', info])
    
    }

}
