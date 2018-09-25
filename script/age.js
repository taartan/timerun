;!( function( w, d ){

    'use strict';

    var finishedProccess = browser.storage.local.get( 'boomDay' ),
        div = get( 'div' ),
        span,

        body = d.body || get( 'body' ),

        cycle = false,

        boomDay,

        updateAge = function() {

            // 31536000000 = 1000 * 60 * 60 * 24 * 365
            //   years     =  ms    s   min  hour  day
            var years =  ( ( ( new Date - boomDay ) / 31536000000 ).toFixed( 9 ) ) + '',
                len = years.length,

                char;

            div.innerHTML = '';

            while ( len-- ) {

                char = years[ len ];

                div.insertAdjacentHTML( 'afterbegin', `<span ${( char == '.' ? 'class="dot"' : '' )}>${char}</span>` );

            }

            cycle = reqAnim( updateAge );

        };

    finishedProccess.then( function( res ) {

        boomDay = res.boomDay;

        if ( !boomDay || isNaN( boomDay.valueOf() ) ) {

            span = get( 'div span' );

            span.on( 'click', function( e ) {

                // if left button is pressed
                e.button || browser.runtime.openOptionsPage();

            });

            return;

        }

        body.removeClass( 'not-ready' );

        cycle = reqAnim( updateAge );

    }, function( e ) {

        div.innerHTML = 'Something very wrong happend, please contact us ( error code: 007 ).';

    });

})( this, document );
