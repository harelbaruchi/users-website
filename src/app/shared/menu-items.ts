import { Injectable } from "@angular/core";



export interface Menu{
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS=[
    {state: "dashboard", name: "dashboard", icon: 'dashboard', role: ''},
    {state: "project", name: "Manage Project", icon: 'build-project', role: ''}
];

@Injectable()
export class MenueItems{
    getMenuItems():  Menu[]{
return MENUITEMS;
    }
}