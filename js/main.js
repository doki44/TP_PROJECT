$(function () {
    //!---------header-----------------------

    $('.header__burger').on('click', function () {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.header__body-img_search').on('click', function () {
        $('.header__body-srch, .header__body-img_profile').toggleClass('active');
        $(this).toggleClass('active');
    });

    //!---------------------------------------

    $('.img-set').on('click', function () {
        $('.img-set, .img-remove').addClass('active');
    });

    $('.img-set-accept').on('click', function () {
        $('.img-set, .img-remove').removeClass('active');
    });

    //!----------spoiler----------------------

    $('.spoiler__btn').click(function () {
        $(this).toggleClass('active').next().slideToggle(300)
    });

    //!---------------------------------------

    //!---------tabs--------------------------

    $('.link__tab').click(function (e) {
        e.preventDefault();

        $('.link__tab').removeClass('link__tab--active');
        $('.tab__item').removeClass('tab__item--active');

        $(this).addClass('link__tab--active');

        $($(this).attr('href')).addClass('tab__item--active');

    });

    $('.link__tab:first').click();

    //*---------
//!< !--Исполнители -->
    $('.link__tab-spec').click(function (e) {
        e.preventDefault();

        $('.link__tab-spec').removeClass('link__tab-spec--active');
        $('.tab__item-spec').removeClass('tab__item-spec--active');

        $(this).addClass('link__tab-spec--active');

        $($(this).attr('href')).addClass('tab__item-spec--active');

    });

    $('.link__tab-spec:first').click();

    //*---------

    $('.link__tab-pages').click(function (e) {
        e.preventDefault();

        $('.link__tab-pages').removeClass('link__tab-pages--active');
        $('.tab__item-pages').removeClass('tab__item-pages--active');

        $(this).addClass('link__tab-pages--active');

        $($(this).attr('href')).addClass('tab__item-pages--active');

    });

    $('.link__tab-pages:first').click();

    //!---------------------------------------

    //!------------reviews_rating-------------

    const ratings = document.querySelectorAll('.rating');

    if (ratings.length > 0) {
        initRatings();
    }

    function initRatings() {
        let ratingActive, ratingValue;
        for (let index = 0; index < ratings.length; index++) {
            const rating = ratings[index];
            initRating(rating);
        }

        function initRating(rating) {
            initRatingVars(rating);
            setRatingActiveWidth();

            if (rating.classList.contains('rating_set')) {
                setRating(rating);
            }
        }

        function initRatingVars(rating) {
            ratingActive = rating.querySelector('.rating__active');
            ratingValue = rating.querySelector('.rating__value');
        }

        function setRatingActiveWidth(index = ratingValue.innerHTML) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
        }

        function setRating(rating) {
            const ratingItems = rating.querySelectorAll('.rating__item');
            for (let index = 0; index < ratingItems.length; index++) {
                const ratingItem = ratingItems[index];
                ratingItem.addEventListener("mouseenter", function (e) {
                    initRatingVars(rating);
                    setRatingActiveWidth(ratingItem.value);
                });

                ratingItem.addEventListener("mouseleave", function (e) {
                    setRatingActiveWidth();
                });

                ratingItem.addEventListener("click", function (e) {
                    initRatingVars(rating);
                    if (rating.dataset.ajax) {
                        setRatingValue(ratingItem.value, rating);
                    } else {
                        ratingValue.innerHTML = index + 1;
                        setRatingActiveWidth();
                    }
                });
            }
        }
    }


    //!---------------------------------------

    //!---------------------------------------

    const popupLinks = document.querySelectorAll('.popup__link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');
    let unlock = true;
    const timeout = 500;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener('click', function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault();
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function(e){
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen(currentPopup) {
        if (currentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            currentPopup.classList.add('open');
            currentPopup.addEventListener('click', function(e){
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true){
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth+'px';

        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
        body.classList.add('lock');
        unlock - false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }

    function bodyUnlock() {
        setTimeout(function() {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';                
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function(e){
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });
});