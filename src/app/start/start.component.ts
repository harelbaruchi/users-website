import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
show: boolean=true;
  constructor() { }

  ngOnInit(): void {
   
  }
  onchange(){
  window.addEventListener('storage', ()=>{
    this.show=false;
  })
}


}
