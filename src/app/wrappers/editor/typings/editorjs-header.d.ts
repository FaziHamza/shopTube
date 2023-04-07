declare module '@editorjs/header' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface HeaderData extends BlockToolData {
      level?: number;
      text?: string;
    }
  
    export default class Header implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): HeaderData;
    }
  }

  declare module '@editorjs/list' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface ListData extends BlockToolData {
      style?: 'ordered' | 'unordered';
      items?: string[];
    }
  
    export default class List implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): ListData;
    }
  }
  
  declare module '@editorjs/checklist' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface ChecklistData extends BlockToolData {
      items?: Array<{ text: string; checked: boolean }>;
    }
  
    export default class Checklist implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): ChecklistData;
    }
  }
  declare module '@editorjs/quote' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface QuoteData extends BlockToolData {
      text?: string;
      caption?: string;
      alignment?: 'left' | 'center';
    }
  
    export default class Quote implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): QuoteData;
    }
  }
  declare module '@editorjs/marker' {
    import { InlineTool } from '@editorjs/editorjs';
  
    export default class Marker implements InlineTool {
      constructor();
      render(): HTMLElement;
      surround(range: Range): void;
      checkState(selection: Selection): boolean;
    }
  }

  declare module '@editorjs/code' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface CodeData extends BlockToolData {
      code?: string;
    }
  
    export default class Code implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): CodeData;
    }
  }
  

  declare module '@editorjs/delimiter' {
    import { BlockTool } from '@editorjs/editorjs';
  
    export default class Delimiter implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(): {};
    }
  }
  declare module '@editorjs/table' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface TableData extends BlockToolData {
      content?: string[][];
    }
  
    export default class Table implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): TableData;
    }
  }
  declare module '@editorjs/embed' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface EmbedData extends BlockToolData {
      service: string;
      source: string;
      embed: string;
      width: number;
      height: number;
      caption?: string;
    }
  
    export default class Embed implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): EmbedData;
    }
  }
  declare module '@editorjs/warning' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface WarningData extends BlockToolData {
      title?: string;
      message?: string;
    }
  
    export default class Warning implements BlockTool {
      constructor();
      render(): HTMLElement;
      save(blockContent: HTMLElement): WarningData;
    }
  }
  declare module '@editorjs/image' {
    import { BlockTool, BlockToolData } from '@editorjs/editorjs';
  
    export interface ImageData extends BlockToolData {
      file?: File;
      url?: string;
      caption?: string;
      withBorder?: boolean;
      withBackground?: boolean;
      stretched?: boolean;
    }
  
    export default class ImageTool implements BlockTool {
      constructor(config?: any);
      render(): HTMLElement;
      save(blockContent: HTMLElement): ImageData;
    }
  }
  declare module '@editorjs/inline-code' {
    import { InlineTool, InlineToolConstructorOptions } from '@editorjs/editorjs';
  
    export default class InlineCode implements InlineTool {
      constructor(options?: InlineToolConstructorOptions);
      render(): HTMLElement;
      surround(range: Range): void;
      checkState(selection: Selection): boolean;
    }
  }
  declare module '@editorjs/link' {
    import { InlineTool, InlineToolConstructorOptions } from '@editorjs/editorjs';
  
    export default class LinkTool implements InlineTool {
      constructor(options?: InlineToolConstructorOptions);
      render(): HTMLElement;
      surround(range: Range): void;
      checkState(selection: Selection): boolean;
    }
  }
          
  


  
  