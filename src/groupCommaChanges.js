import React from 'react';

// Groups consecutive changes of only commas together

export default function(compactedChangeList) {
  var filteredChanges = [];
  var consecutiveCommaChanges = [];

  while (compactedChangeList.length > 0) {
    let cur = compactedChangeList.shift();

    if (cur.changeNodes.length === 1 && cur.changeNodes[0].value === ",") {
      consecutiveCommaChanges.push(cur);
      if (compactedChangeList[0]) {
        if (compactedChangeList[0].changeNodes.filter((node) => node.value === ",").length === 0) {
          filteredChanges.push(groupCommas(consecutiveCommaChanges));
          consecutiveCommaChanges = [];
        }
      }
      else {
        filteredChanges.push(groupCommas(consecutiveCommaChanges));
      };
    }
    else {
      filteredChanges.push(cur);
    };
  };
  return filteredChanges;
}


function groupCommas(changeList) {
  // brace yourself for some ugly JSX mapping...
  // reduces the changes into one change object and constructs new appropiate before/after Text so that it will render nicely
  let groupedChange = {};
  let first = changeList[0];
  let last = changeList[changeList.length  - 1];

  // if commas were added, make the afterText a jsx element with commas added until the right class name.
  if (first.changeNodes[0].added) {
    groupedChange.beforeText = <span> {changeList.map((n) => n.unchangedHead.value).join(' ') + last.unchangedTail.value.match(/^\s*\S*/)[0]} </span>;
    groupedChange.afterText = <span> {changeList.map((n) => {
      return <span>{ n.unchangedHead.value} <span className="catAdded"> , </span> </span>
    })} {last.unchangedTail.value.match(/^\s*\S*/)[0] } </span>;
  }

  // otherwise (commas were deleted), make the beforeText have the commas and appropiate class name
  else {
    groupedChange.beforeText = <span> {changeList.map((n) => n.unchangedHead.value).join(',') + "," + last.unchangedTail.value.match(/^\s*\S*/)[0]} </span>;
    groupedChange.afterText = <span> {changeList.map((n) => n.unchangedHead.value).join(' ') + last.unchangedTail.value.match(/^\s*\S*/)[0] } </span>;
    groupedChange.beforeText = <span> {changeList.map((n) => {
      return <span>{ n.unchangedHead.value} <span className="catRemoved"> , </span> </span>
    })} {last.unchangedTail.value.match(/^\s*\S*/)[0] } </span>;
  }

  groupedChange.unchangedHead = first.unchangedHead
  groupedChange.unchangedTail = last.unchangedTail;
  groupedChange.changeNodes = [].concat.apply(changeList.map((n) => n.changeNodes));
  return groupedChange;
}
