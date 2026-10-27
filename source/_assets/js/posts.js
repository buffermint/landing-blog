// Reading-progress bar on post pages. Other pages that load this script have no bar, so do nothing there.
window.addEventListener('scroll', function () {
    var bar = document.getElementById('blog-scroll-position');
    if (!bar) {
        return;
    }
    var totalScrollableHeight = Number(document.body.scrollHeight) - Number(window.innerHeight);
    var currentOffset = Number(window.pageYOffset);
    bar.style.width = (totalScrollableHeight > 0 ? currentOffset / totalScrollableHeight * 100 : 100) + "%";
});
