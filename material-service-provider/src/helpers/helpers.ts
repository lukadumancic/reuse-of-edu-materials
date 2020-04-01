export function hash(value: string) {
  let hashValue = 0;
  let chr;
  for (let i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    // tslint:disable-next-line: no-bitwise
    hashValue = (hashValue << 5) - hashValue + chr;
    // tslint:disable-next-line: no-bitwise
    hashValue |= 0;
  }
  return Math.abs(hashValue).toString();
}
