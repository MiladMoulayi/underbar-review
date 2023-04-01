(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

    //I
    //O last elements in an array form
    //E n is undefined, return last element; n is negative; array is empty ; n is bigger than length of the array

    if (n === undefined) {
      return array[array.length - 1];
    } else if (n < 0) {
      return array;
    } else if (n > array.length) {
      return array;
    } else if (array.length === 0 || n === 0) {
      return [];
    }

    return array.slice(-n);

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    // I - array or object
    // O - None
    // C - None
    // E - Collection might be empty, might be incorrect data type (not array or object), no iterator is passed in

    // if iterator is not undefined
    if (iterator !== undefined) {
      // check if the collection is an array,
      if (Array.isArray(collection)) {
        // if it is, iterate over array
        for (var i = 0; i < collection.length; i++) {
          // call iterator function on each item
          iterator(collection[i], i, collection);
        }
      } else if (typeof collection === 'object') {
      // check if the collection is an object,
        // if it is, iterate over object
        for (var key in collection) {
          // call iterator function on each item
          iterator(collection[key], key, collection);
        }
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.

  // I - collection (array), test (function)
  // O - array of elements that pass truth test
  // C - None
  // E - if collection is invalid data type, no test passed, collection undefined, empty array

  // create result array

  // check if collection is an array
  // if it is not, return empty array
  // else
  // check the length of array
  // if 0, return empty array
  // if not,
  // if test is undefined, return collection
  // iterate over collection
  // for each element
  // call test on element
  // if test is true
  // push element to result array
  // return result array

  _.filter = function(collection, test) {

    var result = [];

    if (Array.isArray(collection) === false) {
      return result;
    }
    if (collection.length === 0) {
      return [];
    } else {
      if (test === undefined) {
        return collection;
      }
      for (var i = 0; i < collection.length; i++) {
        if (test(collection[i])) {
          result.push(collection[i]);
        }
      }
    }
    return result;
  };


  //I: collection, test -> function
  //O: array of all elements that do not pass the test
  //C: none
  //E: collection is not array; return empty array, if no test then return empty array

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function (item) {
      return !test(item);
    });
  };

  // I: array, isSorted boolean, iterator: function
  // O: new array with duplicate free elements
  // C: none
  // E: if no unique values then return empty array

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var result = [];
    var unique = new Set();
    if (iterator !== undefined) {
      for (var i = 0; i < array.length; i++) {
        unique.add(iterator(array[i]));
      }
      for (var j = 0; j < array.length; j++) {
        if (unique.has(iterator(array[j]))) {
          result.push(array[j]);
          unique.delete(iterator(array[j]));
        }
      }
    } else {
      for (var k = 0; k < array.length; k++) {
        unique.add(array[k]);
      }

      for (var item of unique) {
        result.push(item);
      }
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // create a result array
    // if collection is undefined, return empty array
    // if iterator is not defined, return collection
    // iterate over the collection
    // for each element, call iterator on element
    // push to result array
    // return result array

    var result = [];

    if (collection === undefined) {
      return result;
    }

    if (iterator === undefined) {
      return collection;
    }

    for (var i = 0; i < collection.length; i++) {
      result.push(iterator(collection[i]));
    }

    return result;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  // I - collection (array or object), iterator (function), accumulator (running primitive value) -- (optional for first pass)
  // O - accumulator
  // C - none
  // E - collection is not defined, iterator is not defined (n/a)

  //check if an initial value was passed in for accumulator assign boolean value to a variable hasAccum
  // if it was not, set accumulator to the first element

  // check if collection is an array
  // if it is, iterate over the array using standard for loop
  // if hasAccum,iterate from 0
  // else, iterate from 1
  // call iterator on collection[i] and add result to accumulator
  //if it is not an array and it is an object
  // iterate over the object using for ... in loop
  // call iterator on collection[key] and add result to accumulator


  _.reduce = function(collection, iterator, accumulator) {

    var initializing = arguments.length === 2;

    _.each(collection, function(value) {
      if (initializing) {
        accumulator = value;
        initializing = false;
      } else {
        accumulator = iterator(accumulator, value);
      }
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function(trueSoFar, value) {
      return trueSoFar && iterator(value);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    return !_.every(collection, function(value) {
      return !iterator(value);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(source) {
      _.each(source, function(value, key) {
        obj[key] = value;
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(source) {
      _.each(source, function(value, key) {
        obj[key] === undefined && (obj[key] = value);
      });
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};

    return function() {
      var argsKey = JSON.stringify(arguments);
      if (!results[argsKey]) {
        results[argsKey] = func.apply(this, arguments);
      }
      return results[argsKey];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item) {
      var method = typeof functionOrKey === 'string' ? item[functionOrKey] : functionOrKey;
      return method.apply(item, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
