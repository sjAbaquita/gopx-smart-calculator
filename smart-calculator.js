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

            $('#display-value').html('<small>$</small>'+value.toLocaleString());
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

        return this.init();


    };

} ( jQuery ));