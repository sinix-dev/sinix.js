
const create = () => {
  console.info("Create Function")
}

const load = () => {
  console.info("Load Function")
}

const query = () => {
  console.info("Query Function")
}

const contains = () => {
  console.info("Contains Function")
}

const update_item = () => {
  console.info("Update Item Function")
}

const remove_item = () => {
  console.info("Remove Item Function")
}

const read = () => {
  console.info("Read DB Function")
}

const dump = () => {
  console.info("Dump Function")
}

module.exports = {
  create,
  load,
  query,
  contains,
  update_item,
  remove_item,
  read,
  dump
}
