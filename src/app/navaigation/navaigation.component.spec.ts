import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavaigationComponent } from './navaigation.component';

describe('NavaigationComponent', () => {
  let component: NavaigationComponent;
  let fixture: ComponentFixture<NavaigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavaigationComponent]
    });
    fixture = TestBed.createComponent(NavaigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
