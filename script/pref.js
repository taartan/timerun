;!( function( w, d ) {

    'use strict';

    var finishedProccess = browser.storage.local.get( 'boomDay' ),
        boomDayInput = d.forms[ 0 ].bday;

    finishedProccess.then( function( res ) {

        if ( res.boomDay && !isNaN( res.boomDay.valueOf() ) )
            boomDayInput.value = res.boomDay.toISOString().slice( 0, 10 );

        boomDayInput.addEventListener( 'change', function( e ) {

            browser.storage.local.set({

                boomDay: new Date( this.value )

            });

        });

        boomDayInput.removeAttribute( 'disabled' );

    }, function( e ) {

        d.body.innerHTML = 'Something very wrong happend, please contact us ( error code: 006 ).';

    });

})( this, document );
