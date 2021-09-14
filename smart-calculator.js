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

            $('#display-value').html('<small>$</small>'+value);
        }

        return this.init();


    };

} ( jQuery ));