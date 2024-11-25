import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalsPage } from './animals.page';

describe('AnimalsPage', () => {
  let component: AnimalsPage;
  let fixture: ComponentFixture<AnimalsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
