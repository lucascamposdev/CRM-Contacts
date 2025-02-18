import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/home/sections/clients/clients.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { TagsModule } from './pages/home/sections/tags/tags.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TagsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
