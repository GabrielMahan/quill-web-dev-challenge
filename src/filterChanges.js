import React from 'react';


// this function cleans up the raw diffdata by...
//  1, removing trivial changes
//  2, grouping adjacent changes into a single change object with a list of sub-changes (i.e. don't count changing something as both a deletion and and insertion)

// It returns the list of changes as objects with the before and after text, as well the list of sub changes and the diffData blocks from which they come

export default function(rawDiffData) {
  // remove trivial whitespace values from the raw data
  let diffStack = rawDiffData.filter((node) => !node.value.match(/^\s+$/));

  var unchangedHead = {value: ""};
  var changeNodes = [];
  var compactedChangeList = [];
  var cur = {};

  while (diffStack.length > 0) {
    cur = diffStack.shift();

    // if it's not the last element in the stack
    if (diffStack[0]) {

      // if the current element is a change followed by an unchanged element, add the list of subchanges to the change list and add an element into the return list.
      if ((cur.added || cur.removed) && !diffStack[0].added && !diffStack[0].removed) {
        changeNodes.push(cur);
        let headText = unchangedHead.value.substr(unchangedHead.value.search(/(\S+|^)\s*$/)) + " ";
        let tailText = diffStack[0].value.match(/^\s*\S*/)[0];
        let beforeText =  <span> {headText}  <span className="catRemoved"> {changeNodes.filter( (n) => n.removed).map((m) => m.value ).join(' ')} </span> { tailText} </span>;
        let afterText =  <span> {headText}  <span className="catAdded"> {changeNodes.filter( (n) => n.added).map((m) => m.value ).join(' ')} </span> { tailText} </span>;
        compactedChangeList.push({
          unchangedHead: unchangedHead,
          unchangedTail: diffStack[0],
          changeNodes: changeNodes,
          beforeText: beforeText,
          afterText: afterText
        })
        unchangedHead = diffStack[0];
        changeNodes = [];
      }
      // If the current element is a changed element followed by another changed element, then add it to the list of subchanges
      else if (cur.added || cur.removed) {
        changeNodes.push(cur)
      }
      // if the current element does not represent a change, set it as the head
      else {
        unchangedHead = cur;
      }
    }
    // if it is the last element and it's a change, then add it to the subchange list and make the final push to the return array.
    else {
      if (cur.added || cur.removed) {
        changeNodes.push(cur);

        let headText = unchangedHead.value.substr(unchangedHead.value.search(/(\S+|^)\s*$/)) + " ";
        let afterText =  <span> {headText}  <span className="catAdded"> {changeNodes.filter( (n) => n.added).map((m) => m.value ).join(' ')} </span></span>;
        let beforeText =  <span> {headText}  <span className="catRemoved"> {changeNodes.filter( (n) => n.removed).map((m) => m.value ).join(' ')} </span> </span>;

        compactedChangeList.push({
          unchangedHead: unchangedHead,
          unchangedTail: {value: ""},
          changeNodes: changeNodes,
          beforeText: beforeText,
          afterText: afterText
        })
      }
    }
  }
  return compactedChangeList;
}
