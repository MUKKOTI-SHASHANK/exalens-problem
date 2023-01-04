function apartmentHunting(blocks, reqs) {
  // assuming data for each req in reqs is available in each block, if not assuming as false
  const dp = [];
  for (let i = 0; i < blocks.length; i++) {
    const data = {};
    reqs.forEach((key) => {
      data[key] = blocks[i][key] ? 0 : Math.pow(10, 9);
    });
    dp.push(data);
  }
  reqs.forEach((req) => {
    for (let i = 1; i < dp.length; i++) {
      const block = dp[i];
      const prevBlock = dp[i - 1];
      if (prevBlock[req] !== Math.pow(10, 9)) {
        block[req] = Math.min(block[req], prevBlock[req] + 1);
      }
    }
  });
  reqs.forEach((req) => {
    for (let i = dp.length - 2; i >= 0; i--) {
      const block = dp[i];
      const lastSeenBlock = dp[i + 1];
      if (lastSeenBlock[req] !== Math.pow(10, 9)) {
        block[req] = Math.min(block[req], lastSeenBlock[req] + 1);
      }
    }
  });
  //console.log(dp);
  return dp.reduce(
    (acc, curr, idx) => {
      //console.log(acc,curr,idx);
      const maxVal = Math.max(...Object.values(curr));
      return maxVal < acc.curr ? { ...acc, curr: maxVal, idx } : acc;
    },
    { idx: 0, curr: Number.POSITIVE_INFINITY}
  ).idx;
}

// console.log(apartmentHunting(blocks = [ 
//   { 
//   "gym": false, 
//   "school": true, 
//   "store": false, 
//   }, 
//   { 
//   "gym": true, 
//   "school": false, 
//   "store": false, 
//   }, 
//   { 
//   "gym": true, 
//   "school": true, 
//   "store": false, 
//   }, 
//   { 
//   "gym": false, 
//   "school": true, 
//   "store": false, 
//   }, 
//   { 
//   "gym": false, 
//   "school": true, 
//   "store": true, 
//   } 
//   ],
//   reqs = ["gym", "school", "store"]
//   ))

// Do not edit the line below.
exports.apartmentHunting = apartmentHunting;
