// Pseudo Code...
// Given: a linked list of states, none of them holding the changes per se, but containing a snapshot of the text-align

// What to watch out for...
  // deletions vs insertions!
  // Making insertions, then deleting some of them...
  // Maybe it's best to just compare the final state to the original one???
  // First glance... make a funciton that takes in two strings and outputs a list of changes.


// Text comparison function mk 1... take two strings, output array of changes
  // iterate over each char... until you hit a difference.... insertions are ok...


  // the dog jumped


  // the dog just jumped.
  // Is it really OK to have the change read 'dog jumped' ==> 'dog just jumped'
