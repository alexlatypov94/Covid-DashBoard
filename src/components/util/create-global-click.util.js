import { GLOBAL_SELECTORS } from "../../core/index";

export function createGlobalClick(element) {
    const event = new CustomEvent("globalClickEvent", {
        detail: { targetBtn: undefined },
        bubbles: true,
        cancelable: true
    });

    const { left, right } = GLOBAL_SELECTORS;

    element.addEventListener("click", (e) => {
        const leftClick = left.some((selector) => e.target.classList.contains(selector)) ? "left" : undefined;
        const rightClick = right.some((selector) => e.target.classList.contains(selector)) ? "right" : undefined;

        if (!leftClick && !rightClick) {
            return;
        }

        event.detail.targetBtn = leftClick || rightClick;
        element.dispatchEvent(event);
        e.stopImmediatePropagation();
    });
}
