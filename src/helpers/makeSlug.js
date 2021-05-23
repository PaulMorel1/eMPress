// See https://gist.github.com/mathewbyrne/1280286
function makeSlug(inputString) {
  if(!inputString) return '';
  
  return inputString.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

module.exports = makeSlug;