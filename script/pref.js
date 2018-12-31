;!( ( w, d ) => {

    'use strict';

    var finishedProccess = browser.storage.sync.get( 'birthday' ),
        form = d.forms[ 0 ],

        pass = true,

        id = false,

        selects = getEm( 'form select' ),
        notif = get( '.notif' );

    finishedProccess.then( res => {

        var birthday = res.birthday;

        if ( birthday && birthday.set ) {

            for ( let val of [ 'year', 'month', 'day' ] )
                if ( isNumeric( birthday[ val ] ) )
                    form[ val ].value = birthday[ val ];

            form.unit.value = birthday.unit || 'years';

        }

        selects.forEach( select => {

            select.on( 'change', e => {

                browser.storage.sync.set({

                    birthday: {

                        set: true,

                        year: form.year.value,
                        month: form.month.value,
                        day: form.day.value,

                        unit: form.unit.value

                    }

                });

                if ( notif.hasClass( 'show' ) ) {

                    if ( id )
                        clearTimeout( id );

                    notif.removeClass( 'show' );

                    let lm = notif.cloneNode( 1 );
                    notif.parentNode.insertBefore( lm, notif );

                    notif.remove();
                    notif = lm;

                }

                reqAnim( () => notif.addClass( 'show' ) );
                id = setTimeout( () => notif.removeClass( 'show' ), 2000 );

            });

        });

        if ( pass )
            for ( let select of selects )
                select.attr( 'disabled', false );

    }, e => {

        d.body.innerHTML = 'Something very wrong happend, please contact us ( error code: 006 ).';

    });

})( this, document );
