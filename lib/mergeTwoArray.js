export const mergeTwoArray = (primary, secondary, commonField) => {
  const valueFound = primary.reduce((acc, obj) => {
    const found = secondary.find(
      (obj1) => obj1[commonField] === obj[commonField]
    );

    if (found) {
      acc.push({
        ...obj,
        ...found,
      });
    } else {
      acc.push(obj);
    }
    return acc;
  }, []);

  return valueFound;
};
