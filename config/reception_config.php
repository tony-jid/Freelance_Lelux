<?php
define('RECEPTION_DAY_RATE', '160');
define('RECEPTION_HOUR_RATE', '10');
define('RECEPTION_LATE_NIGHT_RATE', '5');

// Work on PHP 5.6 and newer
const RECEPTION_COM_SALES = array(2249, 2499, 2699, 2999, 3499, 4199, 4499, 4799, 99999999);
const RECEPTION_COM_RATES = array(0, 10, 20, 30, 40, 50, 60, 70, 80);

// Work only at PHP 7
//define('RECEPTION_COM_SALES', array(2249, 2499, 2699, 3499, 99999999));
//define('RECEPTION_COM_RATES', array(0, 10, 20, 30, 40)); // eg. com < 2249 = $0, com < 2499 = $10 
?>