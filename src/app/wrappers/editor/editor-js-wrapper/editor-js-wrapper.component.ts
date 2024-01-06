import { Component, OnInit, ViewChild, ElementRef, forwardRef, OnDestroy, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import axios from "axios";
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import ImageTool from '@editorjs/image';
import { environment } from 'src/environments/environment';
import { DataSharedService } from 'src/app/services/data-shared.service';

// Import other tools as needed

@Component({
  selector: 'st-editor-js-wrapper',
  templateUrl: './editor-js-wrapper.component.html',
  styleUrls: ['./editor-js-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorJsWrapperComponent),
      multi: true
    }
  ]
})
export class EditorJsWrapperComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef;
  @Input() minHeight: string = '300px';
  @Input() data: any;
  private editor: EditorJS;
  private onChange: (data: OutputData) => void;
  private onTouched: () => void;
  serverPath = environment.nestBaseUrl

  constructor(public dataSharedService: DataSharedService) { }

  ngOnInit(): void {

    this.editor = new EditorJS({
      holder: this.editorContainer.nativeElement,
      data: this.data,
      // minHeight: this.minHeight,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: ['link']
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar: true
        },
        marker: {
          class: Marker,
          inlineToolbar: true
        },
        code: {
          class: Code,
          inlineToolbar: true
        },
        delimiter: Delimiter,
        inlineCode: {
          class: InlineCode,
          inlineToolbar: true
        },
        linkTool: {
          class: LinkTool,
          inlineToolbar: true
        },
        embed: {
          class: Embed,
          inlineToolbar: true
        },
        table: {
          class: Table,
          inlineToolbar: true
        },
        warning: {
          class: Warning,
          inlineToolbar: true
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file : any) {
                // your own uploading logic here
                const formData = new FormData();
                formData.append("file", file);
                const response = await axios.post(
                  `${environment.nestBaseUrl}email/upload`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: false,
                  }
                );

                if (response.data.success === 1) {
                  return response.data;
                }
              },
              // async uploadByUrl(url : any) {
              //   const response = await axios.post(
              //     `http://localhost:4001/api/uploadImage/createByUrl`,
              //     {
              //       url,
              //     }
              //   );

              //   if (response.data.success === 1) {
              //     return response.data;
              //   }
              // },
            },
            inlineToolbar: true,
          },
        },
      },
      onChange: async () => {
        if (this.onChange) {
          this.onChange(await this.editor.save());
        }
        if (this.onTouched) {
          this.onTouched();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  writeValue(data: OutputData): void {

    if (this.editor && data) {
      this.editor.clear();
      this.editor.render(data);
    }
  }

  registerOnChange(fn: (data: OutputData) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this method if you need to support the disabled state
  }
}


