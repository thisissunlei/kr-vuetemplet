import OrderApi from "./order";
import publicApi from './public';

export default {
  ...OrderApi,
  ...publicApi
}
