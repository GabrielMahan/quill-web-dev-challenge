
export default function(rawDiffData) {
  let diffStack = rawDiffData.filter((node) => !node.value.match(/^\s+$/));

  var unchangedHead = {value: ""};
  var changeNodes = [];
  var compactedChangeList = [];
  var cur = {};

  while (diffStack.length > 0) {
    console.log('DIFF STACK', diffStack)
    cur = diffStack.shift();
    if (diffStack[0]) {
      if ((cur.added || cur.removed) && !diffStack[0].added && !diffStack[0].removed) {
        changeNodes.push(cur);
        let headText = unchangedHead.value.substr(unchangedHead.value.length - 10) + " ";
        let tailText = " " + diffStack[0].value.substr(0,10);
        let beforeText =  headText + changeNodes.filter( (n) => n.removed).map((m) => m.value ).join(' ') + tailText;
        let afterText = headText + changeNodes.filter((n) => n.added ).map((m) => m.value).join(' ') + tailText;
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

        let headText = unchangedHead.value.substr(unchangedHead.value.length - 10) + " ";
        let beforeText =  headText + changeNodes.filter( (n) => n.removed).map((m) => m.value ).join(' ');
        let afterText = headText + changeNodes.filter((n) => n.added ).map((m) => m.value).join(' ');

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
