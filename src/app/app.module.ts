import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ROUTES } from './app.routes';
import { NoimagePipe } from './pipes/noimage.pipe';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CompartirComponent } from './components/compartir/compartir.component';
import { PaginacionPipe } from './pipes/paginacion.pipe';


import { NgxPaginationModule} from 'ngx-pagination';
import { AlbumComponent } from './components/album/album.component';
import { TrackComponent } from './components/track/track.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'


import { GoogleMapsModule } from '@angular/google-maps';
import { DomseguroPipe } from './pipes/domseguro.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    ContactoComponent,
    CompartirComponent,
    PaginacionPipe,
    NoimagePipe,
    DomseguroPipe,
    AlbumComponent,
    TrackComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule, 
    AppRoutingModule,
    RouterModule.forRoot( ROUTES , { useHash: true} ),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
