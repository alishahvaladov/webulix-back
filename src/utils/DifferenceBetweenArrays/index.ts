const DifferenceBetweenArrays = (arr1: string[], arr2: string[]) => {
  return arr1.filter((item) => !arr2.includes(item));
}

export default DifferenceBetweenArrays;