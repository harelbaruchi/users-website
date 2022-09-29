import { Injectable } from "@angular/core";



export interface Menu{
    state: string;
    name: string;
    icon: string;
    role: string;
}

export enum Status{
    INPROGRESS="INPROGRESS",
    CANCELLED="cancelled",
    CLOSED="closed"
}

const MENUITEMS=[
    {state: "dashboard", name: "dashboard", icon: 'dashboard', role: ''},
    {state: "joke", name: "Manage Jokes", icon: 'book', role: ''}

];

@Injectable()
export class MenueItems{
    getMenuItems():  Menu[]{
return MENUITEMS;
    }
}