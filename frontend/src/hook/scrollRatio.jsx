export default function ScrollRatio(callback, element) {
    let el = element;
    let h = 0;

    while (el) {
        h += el.offsetTop;
        el = el.offsetParent;
    }

    const listener = document.addEventListener("scroll", () => callback((window.scrollY - h) / element.scrollHeight, element));

    return () => removeEventListener("scroll", listener);
}