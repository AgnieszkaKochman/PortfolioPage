var windowWidth = window.innerWidth;

$(document).ready(function($) {
    var sections = $('.page-section');
    var direction = 'up';
    var currentSection = 0;

    $('nav a').click(toHref);
    $('#menu-button').click(toggleMenu);
    $('#arrow').click(toHref);

    $(window).scroll(scrollWindow);

    $('#home').children('.right').addClass('slide-right');
    $('#home').children('.left').addClass('slide-left');


    $(window).resize(function() {
        if ($(window).width() > 968) {
            $('nav').css('display', 'block');
        } else {
            $('nav').css('display', 'none');
        }
    });    
});


/*
 * Function is called when the window is scrolling
 */
function scrollWindow() {
    var scrollPos = $(document).scrollTop();
    var windowHeight = $(window).height();
    var offset = 0.4 * windowHeight;
    
    $('nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("data-href"));
        var color = currLink.attr("data-color");
        var colorArr = ['turquoise', 'violet', 'yellow', 'green', 'blue'];

        // add class active in menu and show color blocks    
        if (refElement.position().top - offset <= scrollPos && refElement.position().top + refElement.height() - offset > scrollPos) {
            $('nav a').removeClass("active");
            currLink.addClass("active");

            refElement.children('.right').addClass('slide-right');
            refElement.children('.left').addClass('slide-left');
            refElement.children('.bottom').addClass('slide-bottom');

            for (i = 0; i < 5; i++) {
                $('.lnr-star-half').removeClass(colorArr[i]);
            }
            $('.lnr-star-half').addClass(color);
        }
        else { // remove class active in menu and hide color blocks
            currLink.removeClass("active");
        }
    });

}


/*
 * Function animates page to a designated location
 */
function toHref() {
    $('html, body').animate({
        scrollTop: $($(this).attr("data-href")).offset().top
    }, 1000);
}

/*
 * Function show and hide menu
 */
function toggleMenu() {
    if( !$('.menu-button').hasClass('active-menu') ) {
        $(this).addClass('active-menu');
        $('nav').css('display', 'block');
    } else {
        $(this).removeClass('active-menu');
        $('nav').css('display', 'none');
    }
}


/*
* Function check if email is correct
*/
function validateEmail(email) {
    var testEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    return testEmail.test(email);
}


/*
* Function check contact form
*/
function validateForm() {
    var name = document.forms['contactForm']['formName'].value,
        email = document.forms['contactForm']['formEmail'].value,
        message = document.forms['contactForm']['formText'].value;

    // check name
    if ( name.length < 3 ) {
        $( '#name-error' ).text( 'Name must be at least 3 characters' );
        return false;
    } else {
        $( '#name-error' ).text( '' );
    }

    // check email
    if ( !validateEmail(email) ) {
        $( '#email-error' ).text( 'Type valid email' );
        return false;
    } else {
        $( '#email-error' ).text( '' );
    }
}