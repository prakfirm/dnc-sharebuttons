import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ShareButton, ShareProvider } from '../../helpers/index';

@Component({
    selector: 'share-button',
    template: "\n      <button [shareButton]=\"button.provider\"\n              [sbUrl]=\"url\"\n              [sbImage]=\"image\"\n              [sbTitle]=\"title\"\n              [sbDescription]=\"description\"\n              [sbTags]=\"tags\"\n              [sbShowCount]=\"showCount\"\n              (sbCount)=\"counter($event)\"\n              (sbPopUpClosed)=\"shareClosed($event)\"\n              [class.sb-show-count]=\"showCount\"\n              [attr.aria-label]=\"button.provider\">\n\n        <div class=\"sb-template\" [innerHtml]=\"button.template\"></div>\n        <span *ngIf=\"showCount && shareCount\" class=\"sb-count\">{{ shareCount | nFormatter: 1 }}</span>\n      </button>\n    ",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareButtonComponent {

    /** Share Args */
    @Input() url: string;
    @Input() title: string;
    @Input() description: string;
    @Input() image: string;
    @Input() tags: string;

    /** Button type e.g. fb, twitter, reddit...etc */
    @Input() button: ShareButton;
    /** Show count, disabled by default */
    @Input() showCount: boolean = false;
    /** Output button count to calculate total share counts */
    @Output() count = new EventEmitter<number>();
    /** Output pop up closed*/
    @Output() popUpClosed = new EventEmitter<ShareProvider>();

    /** Share count for this button */
    shareCount: number;

    counter(count: number) {
        this.shareCount = count;
        this.count.emit(count);
    }

    /** emits closed button type: so user can tell which button has been clicked */
    shareClosed(provider: ShareProvider) {
        this.popUpClosed.emit(provider);
    }

}
