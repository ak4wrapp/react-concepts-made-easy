const user = {
  name: "AK",
  knownnames: ["Aman", "Amandeep", "kirar", "just", "tinku", "aki", "ak"],
  address: {
    house: 101,
    street: "Westgate Dr",
    city: "Edison",
    state: "NJ",
    country: {
      code: "USA",
      label: "United States of America",
    },
  },
};

function flattenObject(obj, parentKey = "", res = {}) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const keyToUse = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], keyToUse, res);
    } else {
      res[keyToUse] = obj[key];
    }
  }

  return res;
}

const flattenObject2 = (obj, parentKey = "", res = {}) => {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const propName = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

console.log(flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } }));
console.log(flattenObject2({ a: 1, b: { c: 2, d: { e: 3 } } }));
