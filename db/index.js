/**
 * Function to create a new database
 * @returns {void}
 */
const create = () => {
  console.info("Create Function")
}
/**
 * Function to load a new database
 * @returns {void}
 */
const load = () => {
  console.info("Load Function")
}
/**
 * Function to query the database
 * @returns {void}
 */
const query = () => {
  console.info("Query Function")
}
/**
 * Function used to check if the value for a key is defined in database
 * @returns {void}
 */
const contains = () => {
  console.info("Contains Function")
}
/**
 * Function to update item in a database
 * @returns {void}
 */
const update_item = () => {
  console.info("Update Item Function")
}
/**
 * Function to remove item from a database
 * @returns {void}
 */
const remove_item = () => {
  console.info("Remove Item Function")
}
/**
 * Function to read the database
 * @returns {void}
 */
const read = () => {
  console.info("Read DB Function")
}
/**
 * "dump" function
 * @returns {void}
 */
const dump = () => {
  console.info("Dump Function")
}
/**
 * Exporting all the defined functions
 */
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
