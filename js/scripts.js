//   $(document).foundation();
$('a.modal-trigger').on('click', function() {
    // var imgUrl = $(this).children('img').attr('reveal-img');
    var imgUrl = $(this).attr('data-image');
    var avatarImgUrl = $(this).next('div').children('div').attr('data-image');
    var attributionText = $(this).next('div').children('span').html();

    var lightbox = $('#lightbox');
    lightbox.children('img').attr('src', imgUrl);
    lightbox.children('div').children('img').attr('src', avatarImgUrl);
    lightbox.children('div').children('span').html(attributionText);
    $(document).foundation('reveal', 'open');
});
