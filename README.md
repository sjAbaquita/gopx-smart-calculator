# GOPX Smart Calculator


1. Add jQuery JavaScript library and the jQuery GOPX Smart Calculator plugin's files to the web page.
```
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="smart-calculator.js"></script>
<link rel="stylesheet" href="smart-calculator.css">
```

2. Create a container to hold the event calculator.
```
<div id="smart-calculator"></div>
```

3. Call the function to generate the smart calculator on the page.
```
$( '#smart-calculator' ).smartCalculator();
```

4. Calculator Options
```
$( '#smart-calculator' ).smartCalculator({
    header: '',
    sidebar_text: '',
    logos: array,
    label: object,
    date_ : array
})
```

```logos``` Logo (array)
```
[
    {
        url: 'images/ms-pixy.png',
        alt_text: 'Ms Pixy'
    },
    {
        url: 'images/gopx-logo.png',
        alt_text: 'GOPX Token'
    }
]
```

```label``` Label (object)
```
{
    amount: 'How much token do you want to sell?',
    date: 'When would you like to sell the token?',
    total: 'Total value'
}
```

```date_``` Date select options (array) 
```
[
    { 
        value: 1,
        text: 'June 21, 2021 - November 30, 2021'
    },
    { 
        value: 20,
        text: 'December 1, 2021 - February 28, 2022'
    },
    //more options
]
```

Complete set of options
```
$( '#smart-calculator' ).smartCalculator({
    header: 'GOPX Calculator',
    sidebar_text: 'TheGOPXtoken.com',
    logos: [
        {
            url: 'images/gopx-logo.png',
            alt_text: 'GOPX Token'
        }
    ],
    label: {
        amount: 'How much token do you want to sell?',
        date: 'When would you like to sell the token?',
        total: 'Total value'
    },
    date_ : [
        { 
            value: 1,
            text: 'June 21, 2021 - November 30, 2021'
        },
        { 
            value: 20,
            text: 'December 1, 2021 - February 28, 2022'
        },
        //more options
    ]
})
```
