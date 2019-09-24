/*
   过滤工具
*/
// 金钱的保留两位小数，3位隔开
function moneyFormat (money, point) {
   point = point > 0 && point <= 20 ? point : 2;
   let isNegative = false;
   if (money < 0) {
      money = Math.abs(money);
      isNegative = true;
   }
   money = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(point) + '';
   let l = money
      .split('.')[0]
      .split('')
      .reverse();
   let r = money.split('.')[1];
   let result = '';
   for (let i = 0; i < l.length; i++) {
      result += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
   }
   return (
      (isNegative ? '-' : '') +
    result
       .split('')
       .reverse()
       .join('') +
    '.' +
    r
   );
}

//  手机格式化 中间****号
function phoneFormat (phone) {
   if (!phone) return '';
   let arr = phone.split('');
   arr.splice(3, 4, '*', '*', '*', '*');
   return arr.join('');
}

export { moneyFormat, phoneFormat };
