// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  var convertNumber, global, parseNumber, plural, words;

  words = [['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'], ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'], ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']];

  plural = function(count, options) {
    var rest;
    if (options.length !== 3) {
      return false;
    }
    count = Math.abs(count) % 100;
    rest = count % 10;
    if (count > 10 && count < 20) {
      return options[2];
    }
    if (rest > 1 && rest < 5) {
      return options[1];
    }
    if (rest === 1) {
      return options[0];
    }
    return options[2];
  };

  parseNumber = function(number, count) {
    var first, numeral, second;
    numeral = '';
    if (number.length === 3) {
      first = number.substr(0, 1);
      number = number.substr(1, 3);
      numeral = "" + words[2][first] + " ";
    }
    if (number < 20) {
      numeral += "" + words[0][parseInt(number, 10)] + " ";
    } else {
      first = number.substr(0, 1);
      second = number.substr(1, 2);
      numeral += "" + words[1][first] + " " + words[0][second] + " ";
    }
    if (count === 1) {
      if (numeral !== '  ') {
        numeral += plural(number, ['тысяча ', 'тысячи ', 'тысяч ']);
        numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
      }
    }
    return numeral;
  };

  convertNumber = function(number) {
    var count, digit, integer, length, numeral, parts, _ref;
    if (!number || ((_ref = typeof number) !== 'number' && _ref !== 'string')) {
      return false;
    }
    integer = parseInt(number, 10);
    if (typeof number === 'string') {
      number = integer;
      if (isNaN(integer)) {
        return false;
      }
    }
    if (integer <= 0) {
      return false;
    }
    number = number.toString();
    numeral = '';
    length = number.length - 1;
    parts = '';
    count = 0;
    while (length >= 0) {
      digit = number.substr(length, 1);
      parts = digit + parts;
      if ((parts.length === 3 || length === 0) && !isNaN(parseInt(parts, 10))) {
        numeral = parseNumber(parts, count) + numeral;
        parts = '';
        count++;
      }
      length--;
    }
    numeral = numeral.replace(/\s+/g, ' ');
    return numeral.trim();
  };

  global = typeof module !== "undefined" && module !== null ? exports : window;

  global.convertNumber = convertNumber;

}).call(this);
