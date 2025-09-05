import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'confecciones-tita-web';

	visible = false;

	open(): void {
		this.visible = true;
	}

	close(): void {
		this.visible = false;
	}
}
