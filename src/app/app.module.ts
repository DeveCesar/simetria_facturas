import { AuthGuardService } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IdiomaComponent } from './config/idioma/idioma.component';
import { ConsecutivoComponent } from './config/consecutivo/consecutivo.component';
import { PconfigComponent } from './config/pconfig/pconfig.component';



@NgModule({
  declarations: [
    AppComponent,
    IdiomaComponent,
    ConsecutivoComponent,
    PconfigComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
