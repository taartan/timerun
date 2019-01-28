;!( ( w, d ) => {

    'use strict';

    var updateAge = () => {

            // =================== 1000 * 60 * 60
            // ===================  ms    s   min
            var unitBasedDivider = 1000 * 60 * 60 * units[ birthday.unit ],
                value =  ( ( ( ( new Date - new Date( [ birthday.year, birthday.month, birthday.day ].join( '-' ) ) ) / unitBasedDivider ).toFixed( 10 ) ) + '' ).slice( 0 , 12 );

            age.innerHTML = '';

            for ( let s of value )
                age.insertAdjacentHTML( 'beforeend', `<span ${ s == '.' ? 'class="dot"' : '' }>${ s }</span>` );

            d.title = '[ ' + value + ' ' + birthday.unit + ' ]';

            cycle = reqAnim( updateAge );

        },

        changePos = function( p ) {

            var s = '',
                percent = ( p * ( 100 + conf.gradWidth ) ) - conf.gradWidth;

            s += `<stop offset="${ percent }%" />`;
            s += `<stop class="blue" offset="${ percent }%" />`;
            s += `<stop class="red" offset="${ percent + conf.gradWidth }%" />`;
            s += `<stop offset="${ percent + conf.gradWidth }%" />`;

            unitsGrad.innerHTML = s;

        },

        hoverable = function( obj ) {

            obj.inAnim = false;

            obj.on( 'mouseenter', function( e ) {

                if ( this.inAnim || this.classList.contains( 'active' ) )
                    return false;

                this.css( 'fill', 'url( #grad )' ).css( 'opacity', 1 );

                this.inAnim = true;
                this.mouseIn = true;

                this.anim({

                    duration: 700,
                    delta: ease.out,
                    func: changePos.bind( unitsGrad ),
                    complete: () => {

                        this.inAnim = false;

                        if ( !this.mouseIn )
                            this.css( 'opacity', false ).css( 'fill', false );

                    }

                });

            }).on( 'mouseleave', function( e ) {

                this.mouseIn = false;

                if ( !this.inAnim )
                    this.css( 'opacity', false ).css( 'fill', false );

            });

            return obj;

        },

        conf = {

            gradWidth: 30

        },

        finishedProccess = browser.storage.sync.get( 'birthday' ),

        noBirthday = get( '.no-birthday' ),
        span,

        age = get( '.age .value' ),

        unitsAdd = get( '.add-units' ),
        unitsGrad = get( '#grad' ),

        body = d.body || get( 'body' ),

        cycle = false,

        units = {

            years: 24 * 365,
            // 6 months have 31 days and 6 of them have 30 days
            months: ( 12 * 30 ) + ( 12 * 31 ),
            weeks: 24 * 7,
            days: 24,
            hours: 1

        },

        birthday;

    finishedProccess.then( res => {

        birthday = res.birthday;

        // we need to put these stuff here because
        // we already have a *gear* icon in our
        // initial page and that should have some animations
        getEm( '.gear' ).forEach( hoverable );

        // Creating first frame of gradient ( all white )
        changePos( 0 );

        if ( !birthday || ![ birthday.year, birthday.month, birthday.day ].every( isNumeric ) ||
                !units[ birthday.unit ] ) {

            span = noBirthday.get( 'span' );

            span.on( 'click', function( e ) {

                // if left button is pressed
                e.button || browser.runtime.openOptionsPage();

            });

            return;

        }

        // Settings are all set, go for it.
        body.removeClass( 'not-ready' );

        cycle = reqAnim( updateAge );

        if ( unitsAdd ) {

            let margin = 10;

            for ( let i in units ) {

                let lc = unitsAdd.lastElementChild,
                    x = lc ?
                            Number( lc.attr( 'x' ) ) + Math.ceil( lc.getBBox().width ) + margin :
                            0,

                    lm = d.createElementNS( 'http://www.w3.org/2000/svg', 'text' );

                // unitsAdd.appendChild( create( 'text' ) ).attr( 'y', 14 ).attr( 'x', x ).appendChild( d.createTextNode( i ) );

                lm.textContent = i;
                lm.attr( 'y', 14 ).attr( 'x', x );

                if ( birthday.unit == i )
                    lm.setAttributeNS( null, 'class', 'active' );

                unitsAdd.appendChild( lm );

            }

            unitsAdd.getEm( 'text' ).forEach( text => {

                hoverable( text ).on( 'click', function( e ) {

                    var selected = this.textContent;

                    if ( !units[ selected ] )
                        return false;

                    birthday.unit = selected;

                    unitsAdd.get( '.active' ).attr( 'class', false );
                    this.setAttributeNS( null, 'class', 'active' );

                    // we need to save selected unit to <browserStorage>
                    // but, all of older values should still remain as same
                    browser.storage.sync.set({

                        birthday: {

                            set: true,

                            year: birthday.year,
                            month: birthday.month,
                            day: birthday.day,

                            unit: selected

                        }

                    });

                });

            });

        }

    }, function( e ) {

        div.innerHTML = 'Something very wrong happend, please contact us ( error code: 007 ).';

    });

})( this, document );
