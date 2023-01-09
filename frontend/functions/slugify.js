export default function slugify (name) {
    let nameSlugArray = name.split(" ");
    let nameSlug = nameSlugArray.join("-");

    return nameSlug.toLowerCase();
}