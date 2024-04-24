import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BettingComponent } from './betting.component';

describe('NotificationsComponent', () => {
  let component: BettingComponent;
  let fixture: ComponentFixture<BettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BettingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
