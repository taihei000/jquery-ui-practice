$(function() {

  let current = 0;
  const slides = $('.slides img');
  const total = slides.length;
  const dotsContainer = $('.dots');
  let interval;
  let isAnimating = false;

  slides.hide().eq(current).show();

  // ドット生成
  for (let i = 0; i < total; i++) {
    dotsContainer.append('<span class="dot"></span>');
  }

  const dots = $('.dot');
  dots.eq(current).addClass('active');

  function showSlide(index) {

    if (isAnimating || index === current) return;
    isAnimating = true;

    slides.stop(true, true).fadeOut(500);
    dots.removeClass('active');

    slides.eq(index)
      .stop(true, true)
      .fadeIn(500, function() {
        isAnimating = false;
      });

    dots.eq(index).addClass('active');

    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % total;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + total) % total;
    showSlide(prev);
  }

  $('.next').click(nextSlide);
  $('.prev').click(prevSlide);

  dots.click(function() {
    let index = $(this).index();
    showSlide(index);
  });

  function startAuto() {
    interval = setInterval(nextSlide, 3000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  $('.slider').hover(stopAuto, startAuto);

  startAuto();

});
