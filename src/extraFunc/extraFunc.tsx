export const genreName = (genres: any, genreArr: any) => {
  let arr = [];
  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < genreArr?.length; j++) {
      if (genres[i] === genreArr[j].id) {
        arr.push(genreArr[j].name);
      }
    }
  }
  return arr;
};
