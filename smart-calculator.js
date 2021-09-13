(function ( $ ) {

    $.fn.smartCalculator = function(options) {
        // var input_date = {
        //     0: {
        //         value: 1,
        //         text: 'June 21, 2021 - November 30, 2021'
        //     },
        //     1: {
        //         value: 20,
        //         text: 'December 1, 2021 - February 28, 2022'
        //     },
        //     2: {
        //         value: 100,
        //         text: 'March 1, 2022 - May 31, 2022'
        //     },
        //     3: {
        //         value: 500,
        //         text: 'June 1, 2022 - May 31, 2023'
        //     },
        //     4: {
        //         value: 2500,
        //         text: 'June 1, 2023 - Open Market'
        //     },
        // }
        var settings = $.extend({
            label: {
                amount: 'How much token do you want to sell?',
                date: 'When would you like to sell the token?',
                total: 'Total value'
            },
            // date_ : input_date
        }, options );

        // var options_data = '';
        // Object.keys(settings.date_).forEach(function(key) {
        //     options_data += '<option value="'+settings.date_[key].value+'" selected>'+settings.date_[key].text+'</option>';
        // });


        //
        var amount = 0;
        var date_value = null;
        var value = 0;

        this.init = function() {
            this.append(
                `<div class="smart-calculator-container">
                    <div class="calculator-input">
                        <label for="fname">`+settings.label.amount+`</label>
                        <input type="text" id="amount" name="amount"><br><br>
                    </div>
                    <div class="calculator-input">
                        <label for="lname">`+settings.label.date+`</label>
                        <select name="date" id="date">
                            <option value="1" selected>June 21, 2021 - November 30, 2021</option>
                            <option value="20">December 1, 2021 - February 28, 2022</option>
                            <option value="100">March 1, 2022 - May 31, 2022</option>
                            <option value="500">June 1, 2022 - May 31, 2023</option>
                            <option value="2500">June 1, 2023 - Open Market</option>
                        </select><br><br>
                    </div>
                    <div class="display-container">
                        <p id="display-value"></p>
                        <p>`+settings.label.total+`</p>
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

            $('#display-value').text(value);
        }

        return this.init();


    };

} ( jQuery ));