import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Token } from './../interface/token';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token:string;

  constructor( private http: HttpClient) {  

  }

  grabarToken(tok:string){
    this.token=tok;
  }
  getObtenerToken(){
  const path= 'https://spotify-get-token.herokuapp.com/spotify/a489ec36708347ce8ba25672404d8be7/cb6e844df09a4cc0a75ef18198b4c2a0'; 
  return this.http.get(path);
  }


  getQuery(query:string) {
    const url =`https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${ this.token }`
    });
    return this.http.get(url, {headers});
  };


  getNewReleases( ){  
    return this.getQuery('browse/new-releases' )
           .pipe( map(data=>data['albums'].items));
  }



    getArtista(clave: string, tipo:string, cantidad:string){
      return this.getQuery(`search?q=${ clave }&type=${ tipo }&limit=${ cantidad }`)
            .pipe( map(data=>data['artists'].items));
          }
    getAlbum(clave: string, tipo:string, cantidad:string){
      return this.getQuery(`search?q=${ clave }&type=${ tipo }&limit=${ cantidad }`)
             .pipe( map(data=>data['albums'].items));
                }
    gettrack(clave: string, tipo:string, cantidad:string){
      return this.getQuery(`search?q=${ clave }&type=${ tipo }&limit=${ cantidad }`)
             .pipe( map(data=>data['tracks'].items));
             }
//funciones de la pagina artista
    getVerArtista(id:string){
      return this.getQuery(`artists/${ id }`);
    }
  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map( data  => data['tracks']));
  }
 
  //funciones de la pagina album
  getVerAlbum(id:string){
    return this.getQuery(`albums/${id}` )
      }
  getRecArtista(id:string){
    return this.getQuery(`albums/${id}` )
    .pipe(map(data=> data['artists']))
  }
  getAlbumTracks(id:string){
    return this.getQuery(`albums/${id}/tracks`)
    .pipe(map(data=>data['items']));
  }
  //funcionesde la pagina Track
  getVerTrack(id:string){
    return this.getQuery(`tracks/${id}`);
  }


}


        //      this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers})
  //      .subscribe( data => {
    //      console.log(data);
      //  });


  //    return this.http.get( `https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=10`, {headers})
   //           .pipe( map( data  => data['artists'].items)); 
    

//    getToken(){
  //    const headers = new HttpHeaders({
//        'Authorization':'Bearer BQBlhFe0f_TZPIs3SZtgg1amhQg_8wu7cY2-7g9JJzWk0OaTHXu4rfgMPuMfrJ_8xgVzCqIxjSJKSWQSHOU'
  //    });
    //  return this.http.get( 'https://accounts.spotify.com/api/token', {headers});

//    }

