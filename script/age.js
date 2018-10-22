;!( ( w, d ) => {

    'use strict';

    var updateAge = () => {

            // =================== 1000 * 60 * 60
            // ===================  ms    s   min
            var unitBasedDivider = 1000 * 60 * 60 * units[ birthday.unit ],
                value =  ( ( ( ( new Date - new Date( [ birthday.year, birthday.month, birthday.day ].join( '-' ) ) ) / unitBasedDivider ).toFixed( 10 ) ) + '' ).slice( 0 , 12 );

            div.innerHTML = '';

            for ( let s of value )
                div.insertAdjacentHTML( 'beforeend', `<span ${( s == '.' ? 'class="dot"' : '' )}>${s}</span>` );

            cycle = reqAnim( updateAge );

        },

        finishedProccess = browser.storage.sync.get( 'birthday' ),

        div = get( 'div' ),
        span,

        body = d.body || get( 'body' ),

        cycle = false,
        units = {

            year: 24 * 365,
            // 6 months have 31 days and 6 of them have 30 days
            month: ( 12 * 30 ) + ( 12 * 31 ),
            week: 24 * 7,
            day: 24,
            hour: 1

        },

        birthday;

    finishedProccess.then( res => {

        birthday = res.birthday;

        if ( !birthday || ![ birthday.year, birthday.month, birthday.day ].every( isNumeric ) ) {

            span = get( 'div span' );

            span.on( 'click', function( e ) {

                // if left button is pressed
                e.button || browser.runtime.openOptionsPage();

            });

            return;

        }

        body.removeClass( 'not-ready' );

        get( '#unit' ).textContent = birthday.unit;

        cycle = reqAnim( updateAge );

    }, function( e ) {

        div.innerHTML = 'Something very wrong happend, please contact us ( error code: 007 ).';

    });

})( this, document );
