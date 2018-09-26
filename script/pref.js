;!( function( w, d ) {

    'use strict';

    var finishedProccess = browser.storage.sync.get( 'boomDay' ),
        boomDayInput = d.forms[ 0 ].bday;

    finishedProccess.then( function( res ) {

        if ( res.boomDay && !isNaN( parseInt( res.boomDay ) ) )
            boomDayInput.value = res.boomDay.slice( 0, 10 );

        boomDayInput.addEventListener( 'change', function( e ) {

            browser.storage.sync.set({

                boomDay: ( new Date( this.value ) ).toISOString().slice( 0, 10 )

            });

        });

        boomDayInput.removeAttribute( 'disabled' );

    }, function( e ) {

        d.body.innerHTML = 'Something very wrong happend, please contact us ( error code: 006 ).';

    });

})( this, document );
