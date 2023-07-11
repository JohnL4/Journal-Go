import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEditorComponent } from './journal-editor.component';

describe('JournalEditorComponent', () => {
  let component: JournalEditorComponent;
  let fixture: ComponentFixture<JournalEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEditorComponent]
    });
    fixture = TestBed.createComponent(JournalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
