/**
 * Created by Ibrahim on 16/09/2017.
 */
$(document).ready(function () {
    if (document.cookie.includes('noBanner=true')) {
        $('#newsletter-banner').css('display', 'none');
        $('#newsletter-banner-mob').css('display', 'none');
    } else {
        $('#newsletter-banner').css('display', 'block');
    }
    setHijriDay();
    setPrayerTimes();
    setMadrasahMap();
    setJummahMap();
    $('.banner-link').css({'text-decoration': 'underline', 'margin-left': '47em'})

});

function getCurrentTime() {
    const currentTime = moment().format('MMMM Do YYYY');

    $('#date-header').html(currentTime);
}

function setHijriDay() {
    const currentTime = moment().format('dddd • Do MMMM YYYY');
    const hijriDateFormat = moment().format('DD-MM-YYYY');
    const hijriApiUrl = 'https://api.aladhan.com/gToH?date=' + hijriDateFormat;

    $.getJSON(hijriApiUrl, function (response) {
        const hijriDay = response['data']['hijri']['day'];
        const hijriMonth = response['data']['hijri']['month']['en'];
        const hijriYear = response['data']['hijri']['year'];

        $('#date-header').html(currentTime + ' • ' + hijriDay + ' ' + hijriMonth + ' ' + hijriYear);
    });
}

function setPrayerTimes() {
    const prayerTimesUrl = 'https://api.aladhan.com/timings/' + moment().format('DD-MM-YYYY') + '?latitude=51.508515&longitude=-0.1254872&timezonestring=Europe/London&method=2&school=1';
    $.getJSON(prayerTimesUrl, function (response) {
        const timings = response['data']['timings'];

        const prayerHtml = 
            '<strong>Fajr:</strong> ' + timings['Fajr'] +
            ' <strong>Sunrise:</strong> ' + timings['Sunrise'] + 
            ' <strong>Dhuhr:</strong> ' + timings['Dhuhr'] + 
            ' <strong>Asr:</strong> ' + timings['Asr'] +
            ' <strong>Maghrib:</strong> ' + timings['Maghrib'] + 
            ' <strong>Isha:</strong> ' + timings['Isha']; 
        $('#prayer-times').html(
            prayerHtml
        );

    });
}

function setNewsLetterBanner() {
    const emailHtmlBanner = 
        '<div id="newsletter-banner" class="row">' +
        '<div class="col-4">Please sign up for our newsletter: </div>' +
        '<div class="col-4"><input tye="email" placeholder="user@example.com"></div>' +
        '<div class="col-4"><i class="fas fa-times"></i></div>';
        '</div>';
    $('body').append(emailHtmlBanner);
}

function setMadrasahMap() {
    const mapOptions = {
        center: new google.maps.LatLng(51.583549, 0.131200),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const elem = document.getElementById("madrasah-location-map");

    if (elem) {
        const map = new google.maps.Map(document.getElementById("madrasah-location-map"), mapOptions);
        const myCenter = {lat: 51.583549, lng: 0.131200};
        const marker = new google.maps.Marker({
            position: myCenter,
            map: map
        }); 

    }

}

function setJummahMap() {
    const mapOptions = {
        center: new google.maps.LatLng(51.585298, 0.136153),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const elem = document.getElementById("jummah-location-map");

    if (elem) {
        const map = new google.maps.Map(document.getElementById("jummah-location-map"), mapOptions);
        const myCenter = {lat: 51.585298, lng: 0.136153};
        const marker = new google.maps.Marker({
            position: myCenter,
            map: map
        }); 

    }

}

function hideBanner() {
    document.cookie = "noBanner=true";
    $('#newsletter-banner').css('display', 'none');
}

function hideMobileBanner() {
    document.cookie = 'noBanner=true';
    $('#newsletter-banner-mob').css('display', 'none');
}