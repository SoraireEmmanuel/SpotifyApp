import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
empresa='AQUI ESTAMOS!!!';
position={
	lat: -34.922533,
	lng: -57.955858
};

label={
	color:'red',
	text:'¡¡¡AQUI ESTAMOS!!!'
};


  constructor() {
     
   }
   


  ngOnInit() {
  	
  }
    

}



