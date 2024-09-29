export const wait = (t) => {
  const future = Date.now()+t;
  while(Date.now()< future){

  }
}