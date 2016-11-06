import React from 'react';

export default function(rawDiffData) {
  let diffStack = rawDiffData.filter((node) => !node.value.match(/^\s+$/));

  var unchangedHead = {value: ""};
  var changeNodes = [];
  var compactedChangeList = [];
  var cur = {};

  while (diffStack.length > 0) {
    cur = diffStack.shift();
    if (diffStack[0]) {
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
      else if (cur.added || cur.removed) {
        changeNodes.push(cur)
      }
      else {
        unchangedHead = cur;
      }
    }
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
  return compactedChangeList
}
