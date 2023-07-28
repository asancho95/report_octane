import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Directive({
	selector: '[popoverTrigger]'
})
export class TableCompetitorDirective implements OnDestroy, OnInit {

	@Input() popoverTrigger: TemplateRef<Object> | undefined;
	@Input() position: number[] | undefined;
	private unsubscribe = new Subject();
	private overlayRef!: OverlayRef;

	constructor(private elementRef: ElementRef, private overlay: Overlay, private vcr: ViewContainerRef) { }
	ngOnInit(): void {
		this.createOverlay();
		this.detachOverlay()
	}

	ngOnDestroy(): void {
		this.detachOverlay();
		this.unsubscribe.next({})
	}

	private detachOverlay(): void {
		if (this.overlayRef.hasAttached()) {
			this.overlayRef.detach();
		}
	}


	private createOverlay() {
		const scrollStrategy = this.overlay.scrollStrategies.block();
		const positionStrategy = this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([{
			originX: 'end',
			originY: 'center',
			overlayX: 'end',
			overlayY: 'center'
		}]).withDefaultOffsetY(300).withDefaultOffsetX(100).withPush(true)

		this.overlayRef = this.overlay.create({
			positionStrategy,
			scrollStrategy,
			hasBackdrop: false,
			backdropClass: ""
		});
		this.overlayRef
			.backdropClick()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe();
	}
	private attachOverlay(): void {
		if (!this.overlayRef.hasAttached() && this.popoverTrigger) {
			const periodSelectorPortal = new TemplatePortal(
				this.popoverTrigger,
				this.vcr
			);
			this.overlayRef.attach(periodSelectorPortal);
		}
	}
	@HostListener("mouseenter") mouseEnter() {
		this.attachOverlay();
	}
	@HostListener("mouseleave") mouseLeave() {
		this.detachOverlay();
		this.unsubscribe.next({});
		this.unsubscribe.complete();
	}

}
