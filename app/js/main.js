'use strict';
if (document.querySelector('.burger')) {
    const navIcon = document.querySelector('.burger');
    navIcon.addEventListener('click', toggleMenu, !1)
}
const nav = document.querySelector('.nav');
const divValues = document.querySelector('.content__values');
const lineWay = document.querySelector('#lineWay');
const carouselItems = {
    'wallythewhale': {
        'title': 'wallythewhale.xyz',
        'tags': ['#Product Development', '#Customer Support'],
        'urls': ['/product-development.html', '/community-support.html']
    },
    'seddona': {
        'title': 'Seddona',
        'tags': ['#Digital Support', '#Product Development'],
        'urls': ['/digital-support.html', '/product-development.html']
    },
    'tifi': {
        'title': 'TiFi Bank',
        'tags': ['#Customer Support','#Product Development'],
        'urls': ['/community-support.html','/product-development.html']
    },
    'superyeti': {
        'title': 'Super Yeti',
        'tags': ['#Product Development'],
        'urls': ['/product-development.html']
    },
    // TODO: more link 
    'aira': {
        'title': 'AiraLab',
        'tags': ['#Digital Support'],
        'urls': ['/digital-support.html']
    },
    'pandora': {
        'title': 'Pandora Boxchain',
        'tags': ['#Digital Support'],
        'urls': ['/digital-support.html']
    },
    'p2p.org': {
        'title': 'P2p.org',
        'tags': ['#Consulting'],
        'urls': ['/digital-support.html']
    }
};
document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none'
    }, 1000)
});
function toggleMenu(e) {
    let element = e.currentTarget;
    if (element.classList.contains('burger--open')) {
        element.classList.remove('burger--open');
        nav.style.display = 'none'
    } else {
        element.classList.add('burger--open');
        nav.style.display = 'flex'
    }
}
var scroll = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60)
}
;
var elementsToShow = document.querySelectorAll('.show-on-scroll');
function loop() {
    elementsToShow.forEach(function(element) {
        if (isElementInViewport(element)) {
            element.classList.add('is-visible')
        }
    });
    scroll(loop)
}
loop();
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return ((rect.top <= 0 && rect.bottom >= 0) || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) || (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)))
}
var topContentChanger = function() {
    let settings = {
        tags: ["#custom", "#blockchain", "#smart-contract", "#web", "#marketplace"],
        images: ["we_are_decentralization.svg", "we_are_AI.svg", "we_are_blockchain.svg", "we_are_robonomics.svg", "we_are_VR.svg"],
    }
    var interval;
    var reNew = function() {
        var current = 0;
        interval = setInterval(function() {
            if (settings.images.length === current) {
                current = 0
            }
            document.querySelector(".content__text--custom").innerHTML = settings.tags[current];
            document.querySelector(".img--about").src = `app/img/about/${settings.images[current]}`;
            current++
        }, 2000)
    }
    return {
        reNew: reNew,
    }
}
var h = new topContentChanger();
if (document.querySelector(".content__text--custom")) {
    h.reNew()
}
if (document.querySelector('#fullpage')) {
    new fullpage('#fullpage',{
        anchors: ['welcome', 'about', 'services', 'values', 'clients', 'team', 'partners', 'contacts'],
        menu: '#menu',
        loopHorizontal: !1,
        navigation: !0,
        navigationTooltips: ['welcome', 'about', 'services', 'values', 'clients', 'team', 'partners', 'contacts'],
        css3: !0,
        scrollingSpeed: 800,
        autoScrolling: !1,
        responsiveWidth: 890,
        responsiveHeight: 600,
        fitToSection: !1,
        lisenceKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        onLeave: function(origin, destination, direction) {
            if (destination.anchor == 'services') {
                divValues.classList.add('content__values--animation');
                lineWay.beginElement()
            }
        }
    })
}
if (document.querySelector('.carousel')) {
    var slider = tns({
        container: '.carousel',
        items: 3,
        loop: !0,
        controls: !0,
        nav: !1,
        controlsContainer: '.carousel__controls',
        responsive: {
            991: {
                items: 5
            }
        },
    });
    function setActiveSlides(data) {
        var activeSlides = data.container.querySelectorAll('.tns-slide-active');
        activeSlides.forEach(function(item) {
            item.classList.remove('carousel__item--center');
            item.classList.remove('carousel__item--closest')
        });
        var centeredSlide = parseInt(activeSlides.length / 2, 10);
        activeSlides[centeredSlide].classList.add('carousel__item--center');
        activeSlides[centeredSlide - 1].classList.add('carousel__item--closest');
        activeSlides[centeredSlide + 1].classList.add('carousel__item--closest');
        var id = activeSlides[centeredSlide].getAttribute('data-id');
        document.querySelector('.content__text.content__text--common.dynamic').textContent = carouselItems[id].title;
        var sliderTags = document.querySelector('.sliderTags');
        var items = '';
        carouselItems[id].tags.forEach(function(item, i) {
            items += `<li class="list__item list__item--width"><a href="${carouselItems[id].urls[i]}" target="_blank" rel="noopener" class="btn btn--carousel"><span class="btn__text">${carouselItems[id].tags[i]}</span></a></li>`
        })
        sliderTags.innerHTML = items
    }
    slider.events.on('transitionEnd', setActiveSlides)
}
