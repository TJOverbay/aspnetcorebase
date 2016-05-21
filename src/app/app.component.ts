import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.view.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent {
    pageTitle: string = "ASP.NET Core Base";
    headerText: string = "This is the header content";
    mainText: string = "This is the main content";
    footerText: string = "This is the footer content";
}