export default function pluralize(n, one, two, five, withoutValue=false) {
  if (n === 0) {
    return withoutValue ? five : `${n} ${five}`;
  }
  let number = n;
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return withoutValue ? five : `${n} ${five}`;
  }
  number %= 10;
  if (number === 1) {
    return withoutValue ? one : `${n} ${one}`;
  }
  if (number >= 2 && number <= 4) {
    return withoutValue ? two : `${n} ${two}`;
  }

  return withoutValue ? five : `${n} ${five}`;
}