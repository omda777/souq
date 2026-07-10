
const genrateSlug = (name : string) : string =>{

    return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special characters
    .replace(/\s+/g, '-')       // spaces to hyphens
    .replace(/-+/g, '-');       // collapse multiple hyphens

}

export default genrateSlug;