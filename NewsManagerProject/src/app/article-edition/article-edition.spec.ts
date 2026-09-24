import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleEdition } from './article-edition';

describe('ArticleEdition', () => {
  let component: ArticleEdition;
  let fixture: ComponentFixture<ArticleEdition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleEdition],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleEdition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
