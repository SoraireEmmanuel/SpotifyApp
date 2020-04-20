import { Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { CompartirComponent } from './components/compartir/compartir.component';
import { AlbumComponent } from './components/album/album.component';
import { TrackComponent } from './components/track/track.component';
import { ContactoComponent } from './components/contacto/contacto.component';



export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'artista/:id', component: ArtistaComponent },
    { path: 'album/:id', component: AlbumComponent    },
    { path: 'track/:id', component: TrackComponent},
    { path: 'compartir/:id', component: CompartirComponent },
    { path: 'contacto', component: ContactoComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },    
];