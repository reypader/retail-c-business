export function deepCopy(obj: Object): Object {
  let copy;

  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepCopy(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported.');
}


export function formatDate(d: Date): string {
  return d.getFullYear() + '-' + _to2digit(d.getMonth() + 1) + '-' + _to2digit(d.getDate());
}

function _to2digit(n: number) {
  return ('00' + n).slice(-2);
}
