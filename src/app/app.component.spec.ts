import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './app.footer.component';
import { TabViewModule } from 'primeng/tabview';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                TabViewModule
            ],
            declarations: [
                AppComponent,
                AppFooterComponent,
            ],
            providers: []
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
