export async function sleep(ms) {
  return new Promise((resolve => setTimeout(resolve, ms)))
}

export function mergeObjects(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      // Check if sourceValue is a non-array object and targetValue is also a non-array object
      if (isObject(sourceValue) && isObject(targetValue)) {
        mergeObjects(targetValue, sourceValue);
      } else if (isPrimitive(sourceValue)) {
        if (shouldFill(target, key)) {
          target[key] = sourceValue;
        }
      }
    }
  }
  return target;
}

export function testState(current, model, optional = []) {
  for (const key in model) {
    if (optional.includes(key) && !current[key]) {
      continue;
    }

    if (isObject(model[key])) {
      if (!isObject(current[key]) || !testState(current[key], model[key], optional)) {
        return false;
      }
    } else {
      if (!current[key]) {
        return false;
      }
    }
  }
  
  return true;
}


function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}

function shouldFill(obj, key) {
  return !(key in obj) || 
          obj[key] === null || 
          obj[key] === undefined || 
          obj[key] === '';
}