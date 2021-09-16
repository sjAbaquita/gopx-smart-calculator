/**
 * Author: Seth
 */


(function ( $ ) {

    $.fn.smartCalculator = function(options) {

        var logos = [
            {
                url: 'images/ms-pixy.png',
                alt_text: 'Ms Pixy'
            },
            {
                url: 'images/gopx-logo.png',
                alt_text: 'GOPX Token'
            }
        ];

        var input_date = [
            { 
                value: 1,
                text: 'June 21, 2021 - November 30, 2021'
            },
            { 
                value: 20,
                text: 'December 1, 2021 - February 28, 2022'
            },
            { 
                value: 100,
                text: 'March 1, 2022 - May 31, 2022'
            },
            { 
                value: 500,
                text: 'June 1, 2022 - May 31, 2023'
            },
            { 
                value: 2500,
                text: 'June 1, 2023 - Open Market'
            }
        ];

        var settings = $.extend({
            header: 'GOPX Calculator',
            sidebar_text: 'TheGOPXtoken.com',
            logos: logos,
            label: {
                amount: 'How much token do you want to sell?',
                date: 'When would you like to sell the token?',
                total: 'Total value'
            },
            date_ : input_date
        }, options );


        //
        var amount = 0;
        var date_value = null;
        var value = 0;

        this.init = function() {
            
            //logos
            var logos_data = '';
            settings.logos.forEach(e => {
                logos_data += '<img src="'+e.url+'" alt="'+e.alt_text+'"></img>';
            });

            //options
            var options_data = '';
            settings.date_.forEach(e => {
                options_data += '<option value="'+e.value+'" '+ (settings.date_[0].value == e.value ? 'selected' : '') +'>'+e.text+'</option>';
            });

            this.append(
                `<div class="smart-calculator-container">
                    <div class="calculator-left">
                        <h2>`+settings.sidebar_text+`</h2>
                    </div>
                    <div class="calculator-right">
                        <div class="calculator-header">
                            <h2>`+settings.header+`</h2>
                            <div class="calculator-logo">
                                `+logos_data+`
                            </div>
                        </div>
                        <div class="calculator-form">
                            <div class="calculator-input">
                                <label for="fname">`+settings.label.amount+`</label>
                                <div class="calculator-group">
                                    <input class="calculator-field" type="text" id="amount" name="amount">
                                    <span></span>
                                </div>
                            </div>
                            <div class="calculator-input">
                                <label for="lname">`+settings.label.date+`</label>
                                <select name="date" id="date">
                                    `+options_data+`
                                </select>
                            </div>
                                <ol id="calculator-progress-bar" class="calculator-progress-bar">
                                    <li class="calculator-is-active" data-target="100"><span>100</span></li>  
                                    <li class="calculator-is-active" data-target="500"><span>500</span></li>  
                                    <li class="calculator-not-pass"></li>
                                    <li class="calculator-is-active" data-target="2500"><span>2500</span></li>  
                                    <li class="calculator-is-empty"></li>
                                </ol>
                            <div class="display-container">
                                <p id="display-value"></p>
                                <p>`+settings.label.total+`</p>
                            </div>
                        </div>
                    </div>
                </div>`
            )

            calculate();
            //change value on select date change
            $('#date').on('change', function() {
                changeProgress();
                calculate();
            })

            //change value on amount change
            $('#amount').on('keyup', function() {
                calculate();
            })
        }

        var calculate = function() {
            date_value = $('#date').val();
            amount = $('#amount').val();

            (!$.isNumeric(amount) ? value = 0 : value = amount*date_value)

            $('#display-value').html('<small>$</small>'+(value != 0 ? number_format( value, 2, '.', ',' ) : value));
        }

        //will change this approach
        var changeProgress = function() {
            date_value = $('#date').val();
            var progress = $('li[data-target="' + date_value + '"]');
            
            var active = $('#calculator-progress-bar li[data-target]');
            
            if( parseInt($(active[0]).attr('data-target')) == parseInt(date_value) ) {
                $(active[0]).removeClass().addClass('calculator-is-complete').nextAll('.calculator-is-complete').removeClass().addClass('calculator-is-active')
            } else {
                $('#calculator-progress-bar').find('.calculator-is-complete').removeClass().addClass('calculator-is-active');
            }
            
            if( parseInt($(active[1]).attr('data-target')) == parseInt(date_value) ) {
                $(active[1]).removeClass().addClass('calculator-is-complete').prevAll('.calculator-is-active').removeClass().addClass('calculator-is-complete')
                $(active[2]).removeClass().addClass('calculator-is-complete').removeClass().addClass('calculator-is-active')
            }
            if( parseInt($(active[2]).attr('data-target')) == parseInt(date_value) ) {
                $(active[2]).removeClass().addClass('calculator-is-complete').prevAll('.calculator-is-active').removeClass().addClass('calculator-is-complete')
                $('#calculator-progress-bar').find('.calculator-not-pass').removeClass().addClass('calculator-is-pass')
            } else {
                $('#calculator-progress-bar').find('.calculator-is-pass').removeClass().addClass('calculator-not-pass')
            }
            
        }

        var number_format = function(number, decimals, decPoint, thousandsSep) {
            //  JavaScript equivalent to PHP's number_format
            //  discuss at: https://locutus.io/php/number_format/
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
            const n = !isFinite(+number) ? 0 : +number
            const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
            const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
            const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
            let s = ''
            const toFixedFix = function (n, prec) {
                if (('' + n).indexOf('e') === -1) {
                    return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
                } else {
                    const arr = ('' + n).split('e')
                    let sig = ''
                    if (+arr[1] + prec > 0) {
                        sig = '+'
                    }
                    return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
                }
            }
            // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || ''
                s[1] += new Array(prec - s[1].length + 1).join('0')
            }
            return s.join(dec)
        }

        return this.init();


    };

} ( jQuery ));