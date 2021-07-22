window.addEventListener('scroll', function(e){
    var totalScrollableHeight = Number(document.body.scrollHeight) - Number(window.innerHeight);
    var currentOffset = Number(window.pageYOffset);
    document.getElementById('blog-scroll-position').style.width = (currentOffset / totalScrollableHeight * 100) + "%"
})