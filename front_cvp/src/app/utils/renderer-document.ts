import { Renderer2 } from "@angular/core";

export function desactiveScroll(openModal: boolean, renderer: Renderer2) {
    openModal ? renderer.removeClass(document.body, 'overflow-hidden') : renderer.addClass(document.body, 'overflow-hidden');
}