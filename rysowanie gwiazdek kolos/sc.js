function test(n, m) {
  let tempN = n;
  let len = 0;
  let row = "";
  flag = false;

  for (let i = 0; i < m; i++) {
    if (flag === false) {
      row = "";
      for (let j = 0; j < tempN; j++) {
        row += "-";
      }
      tempN--;

      for (let k = 0; k < len; k++) {
        row += "*";
      }
      len++;
      if (len > n) {
        flag = true;
        tempN = 0;
        len = n;
      }
    }

    if (flag === true) {
      row = "";
      for (let k = 0; k < len; k++) {
        row += "*";
      }
      for (let j = 0; j < tempN; j++) {
        row += "-";
      }

      if (len === 0 && tempN === n) {
        flag = false;
        tempN -= 1;
        len += 1;
      } else {
        tempN += 1;
        len -= 1;
      }
      
    }
    console.log(row);
  }
}

test(5, 19);
