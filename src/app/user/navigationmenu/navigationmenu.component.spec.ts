import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationmenuComponent } from './navigationmenu.component';

describe('NavigationmenuComponent', () => {
  let component: NavigationmenuComponent;
  let fixture: ComponentFixture<NavigationmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
