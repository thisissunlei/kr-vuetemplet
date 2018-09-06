import OrderApi from "./order";
import publicApi from './public';
import miniProgram from './miniProgram'

export default {
  ...OrderApi,
  ...publicApi,
  ...miniProgram
}
