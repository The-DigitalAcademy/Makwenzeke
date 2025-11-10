import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPersistence } from './session-persistence';

describe('SessionPersistence', () => {
  let component: SessionPersistence;
  let fixture: ComponentFixture<SessionPersistence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionPersistence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionPersistence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
