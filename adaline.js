const data = require('./data.json');

const operationData = require('./operatiorData.json');

for (let i = 0; i < 5; i++) {
  console.log('Training: ', i);
  let w = Array.from({ length: data.length }, () => Math.random() * 1);
  
  const n = 0.0025;
  const precision = Math.pow(10, -6);
  const p = data.length;
  
  let eqm = [0];
  let u = 0;
  
  console.log('Initial weights: ', w[0].toPrecision(4), w[1].toPrecision(4), w[2].toPrecision(4), w[3].toPrecision(4), w[4].toPrecision(4));
  
  for (let epoch = 0; epoch < data.length; epoch++) {
    const x = [data[epoch].x1, data[epoch].x2, data[epoch].x3, data[epoch].x4];
    const d = data[epoch].d;
  
  
    for (let k = 0; k < x.length; k++) {
  
      u += w[k] * x[k];
      w[epoch] = w[epoch] + n * (d - u) * x[k];
  
      eqm.push(eqm[k] + (d - u)**2);
    }
    
    eqm.push(eqm[epoch] / p);
  
    const eqmDiff = eqm[epoch] - eqm[epoch - 1];
  
    if (eqmDiff < precision) {
      console.log('Epochs: ', epoch);
      break;
    }
    
  }
  console.log('Final weights: ', w[0].toPrecision(4), w[1].toPrecision(4), w[2].toPrecision(4), w[3].toPrecision(4), w[4].toPrecision(4) + '\n');

  console.log('\n--------------------------------------')
  console.log('\n           Operation Phase')
  console.log('\n--------------------------------------')

  for (let i = 0; i < operationData.length; i++) {
    const x = [operationData[i].x1, operationData[i].x2, operationData[i].x3, operationData[i].x4];

    let u = 0;

    // multiply weights by x
    for (let k = 0; k < x.length; k++) {
      u += w[k] * x[k];
    }


    y = Math.sign(u);
    if(y == -1) {
      console.log('The result is: ', 'Class A');
    }

    if(y == 1) {
      console.log('The result is: ', 'Class B');
    }

  }

}
