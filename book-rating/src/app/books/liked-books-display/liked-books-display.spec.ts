import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedBooksDisplay } from './liked-books-display';

describe('LikedBooksDisplay', () => {
  let component: LikedBooksDisplay;
  let fixture: ComponentFixture<LikedBooksDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedBooksDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedBooksDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
