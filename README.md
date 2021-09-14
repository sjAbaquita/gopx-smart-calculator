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

4. Change inputs labeling
```
$( '#smart-calculator' ).smartCalculator({
    label: {
        amount: 'How much token do you want to sell?',
        date: 'When would you like to sell the token?',
        total: 'Total value'
    }
});
```