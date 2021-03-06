import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-infinity-scroll',
  template:'<ng-content></ng-content><div #anchor></div>',
})
export class InfinityScrollComponent implements OnInit {

  @Output() scrolled:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('anchor', { static: true }) anchor:ElementRef<HTMLElement>;

  observer:IntersectionObserver;

  constructor(
    private host:ElementRef
  ) { }

  ngOnInit() {
    const options = {
      root:this.isHostScrollable() ? this.host.nativeElement : null,
      rootMargin:'0px 0px 200px 0px',
      threshold:0
    };

    this.observer = new IntersectionObserver(([e]) => {
      e.isIntersecting && this.scrolled.emit(true);
    } , options);

    this.observer.observe(this.anchor.nativeElement);
  }
  

  get element() {
     return this.host.nativeElement;
  }

  isHostScrollable(){
    let style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
        style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();  
    }
  }
}
