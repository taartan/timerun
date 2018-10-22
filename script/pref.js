;!( ( w, d ) => {

    'use strict';

    var finishedProccess = browser.storage.sync.get( 'birthday' ),
        form = d.forms[ 0 ],

        pass = true,

        selects = getEm( 'form select' );

    finishedProccess.then( res => {

        var birthday = res.birthday;

        if ( birthday && birthday.set ) {

            for ( let val of [ 'year', 'month', 'day' ] )
                if ( isNumeric( birthday[ val ] ) )
                    form[ val ].value = birthday[ val ];

            form.unit.value = birthday.unit || 'year';

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

            });

        });

        if ( pass )
            for ( let select of selects )
                select.attr( 'disabled', false );

    }, e => {

        d.body.innerHTML = 'Something very wrong happend, please contact us ( error code: 006 ).';

    });

    // Delete older datas if exists.
    browser.storage.sync.remove( 'boomDay' );
    browser.storage.local.remove( 'boomDay' );

})( this, document );
