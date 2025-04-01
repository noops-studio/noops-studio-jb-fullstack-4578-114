import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tiny-editor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <textarea 
      [value]="value" 
      (input)="onChange(($event.target as HTMLTextAreaElement).value)" 
      [placeholder]="placeholder" 
      [style.height.px]="height">
    </textarea>
  `,
  styleUrls: ['./tiny-editor.component.css']
})
export class TinyEditorComponent {
  @Input() value: string = '';
  @Input() placeholder: string = 'Type your content here...';
  @Input() height: number = 300;
  @Output() valueChange = new EventEmitter<string>();

  onChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}
