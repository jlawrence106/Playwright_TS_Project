// Add values with Dollar 
export function sumDollarValues(values) {
    let sum = 0;
    for (const value of values) {
      const num = parseFloat(value.replace('$', ''));
      sum += num;
    }
      return '$' + sum.toFixed(2);
  }

// Get the Tax
export function getTaxCalc(value) {
    let tprice = parseFloat(value.replace('$', ''));
    let tax = tprice * 0.08;
    
      return '$' + tax.toFixed(2);
  }

  // Random Index
export function getRndIndex(values) {
    const randomIndex = Math.floor(Math.random() * values.length);
    
      return randomIndex;
  }

  //Get Current Date and Time for Logs and Screenshots
export function getNow() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${day}${month}${year}${hours}${minutes}${seconds}`;
  }
  
  

