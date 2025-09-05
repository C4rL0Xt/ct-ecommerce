import { Component } from '@angular/core';
import { HeaderConfeccionesTitaComponent } from '../../shared/components/header-confecciones-tita/header-confecciones-tita.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout',
  imports: [HeaderConfeccionesTitaComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
