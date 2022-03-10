// const result = {
//    john: {},
//    noah: {},
//    cesar: {
//        richard: {
//            j3: {}
//        },
//        eugene: {
//            madeline: {}
//        }
//    }
// };
// Requirements
// - Solution should make ONE pass through the array
// - Solution should handle arbitrary ordering of the objects in the people array
// - Order in the result object does not matter
// Tip
// - Take advantage of JavaScript's ability to pass objects by reference

const people = [
  { id: "richard", parentId: "cesar" },
  { id: "john", parentId: null },
  { id: "madeline", parentId: "eugene" },
  { id: "cesar", parentId: null },
  { id: "eugene", parentId: "cesar" },
  { id: "noah", parentId: null },
  { id: "j3", parentId: "richard" },
];

const result = {};

function updateNestedObjects(result, resKeys, pid, id) {
  for (let j = 0; j < resKeys.length; j++) {
    if (result[resKeys[j]].hasOwnProperty(pid)) {
      result[resKeys[j]][pid][id] = {};
      result[pid] = undefined;
      delete result[pid];
      return result[pid];
    } else {
      result[pid] = {};
      result[pid][id] = {};
    }
  }
}

function restructure(result, i) {
  if (i == people.length) {
    return console.log(result);
  }

  const id = people[i].id;
  const pid = people[i].parentId;
  const resKeys = Object.keys(result);

  if (resKeys.includes(pid)) {
    result[pid][id] = {};
  } else if (pid == null && !resKeys.includes(id)) {
    result[id] = {};
  } else if (pid != null && !resKeys.includes(pid)) {
    if (resKeys.length == 0) {
      result[pid] = {};
      result[pid][id] = {};
    } else {
      let delObj = updateNestedObjects(result, resKeys, pid, id);
      delObj = undefined;
      delete delObj;
    }
  }

  restructure(result, i + 1);
}

restructure(result, 0);
