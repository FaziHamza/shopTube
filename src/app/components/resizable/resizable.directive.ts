import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Inject, Output } from "@angular/core";
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { fromEvent } from "rxjs";

@Directive({
  selector: "[resizable]"
})
export class ResizableDirective {
  @Output()
  readonly resizable = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    "mousedown"
  ).pipe(
    tap(e => e.preventDefault()),
    switchMap(() => {
      debugger
      const thElement = this.elementRef.nativeElement.closest("th");

      if (!thElement) {
        // Handle the case when the closest "th" element is not found.
        return [];
      }

      const { width, right } = thElement.getBoundingClientRect();

      return fromEvent<MouseEvent>(this.documentRef, "mousemove").pipe(
        map(({ clientX }) => width + clientX - right),
        distinctUntilChanged(),
        takeUntil(fromEvent(this.documentRef, "mouseup"))
      );
    })
  );

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) {}
}
