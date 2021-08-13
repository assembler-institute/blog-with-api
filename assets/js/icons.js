/**
 * Assings an icon to the user/company name
 *
 * @param {String} name name of user or company
 */
async function userIcon(name) {

  const users = await fetch("https://jsonplaceholder.typicode.com/users") //id del comentario
    .then(response => response.json())

  const userNamesArray = [];

  for (const user of users) {
    const { name, company } = { ...user };

    userNamesArray.push(name);
    userNamesArray.push(company.name);
  }

  const iconsArray = [
    `<i class="bi bi-emoji-heart-eyes"></i>`,
    `<i class="bi bi-emoji-dizzy"></i>`,
    `<i class="bi bi-emoji-expressionless"></i>`,
    `<i class="bi bi-emoji-frown"></i>`,
    `<i class="bi bi-emoji-angry"></i>`,
    `<i class="bi bi-emoji-laughing"></i>`,
    `<i class="bi bi-emoji-neutral"></i>`,
    `<i class="bi bi-emoji-smile"></i>`,
    `<i class="bi bi-emoji-smile-upside-down"></i>`,
    `<i class="bi bi-emoji-sunglasses"></i>`,
    `<i class="bi bi-emoji-wink"></i>`,
    `<i class="bi bi-emoji-expressionless-fill"></i>`,
    `<i class="bi bi-emoji-frown-fill"></i>`,
    `<i class="bi bi-emoji-heart-eyes-fill"></i>`,
    `<i class="bi bi-emoji-laughing-fill"></i>`,
    `<i class="bi bi-emoji-neutral-fill"></i>`,
    `<i class="bi bi-emoji-smile-fill"></i>`,
    `<i class="bi bi-emoji-smile-upside-down-fill"></i>`,
    `<i class="bi bi-emoji-sunglasses-fill"></i>`,
    `<i class="bi bi-emoji-dizzy-fill"></i>`,
    `<i class="bi bi-emoji-angry-fill"></i>`,
    `<i class="bi bi-emoji-wink-fill"></i>`,
  ]
  const nameIndex = userNamesArray.indexOf(name);
  let userIcon;

  nameIndex <= iconsArray.length - 1 ? userIcon = iconsArray[nameIndex]
    : userIcon = iconsArray[nameIndex - iconsArray.length - 1]

  return userIcon;
}

export { userIcon };