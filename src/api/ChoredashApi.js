import axios from 'axios';
import { TOKEN_STORAGE_ID } from '../App.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001/api';

class ChoredashApi {
  static async request(endpoint, params = {}, verb = 'get') {
    let _token = localStorage.getItem(TOKEN_STORAGE_ID);

    console.log('API Call:', endpoint, params, verb);

    let q;

    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params },
      });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === 'patch') {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUserByToken(token) {
    let res = await this.request(`auth/verify`, { _token: token }, 'post');
    return res;
  }

  static async getChores(search) {
    let res = await this.request('chores', { search });
    return res;
  }

  static async getChoreByCode(code) {
    console.log('getting chore with code', code);
    let res = await this.request(`chores/${code}`);
    return res;
  }

  static async getCart(custId) {
    let res = await this.request(`customers/${custId}/cart`);
    return res;
  }

  static async addToCart(custId, item) {
    let res = await this.request(
      `customers/${custId}/cart`,
      { item, action: 'ADD' },
      'patch'
    );
    return res;
  }

  static async removeFromCart(custId, itemCode) {
    let res = await this.request(
      `customers/${custId}/cart`,
      { item:{item_code:itemCode}, action: 'REMOVE' },
      'patch'
    );
    return res;
  }

  static async getOrders(custId) {
    let res = await this.request(`customers/${custId}/orders`);
    return res;
  }

  static async login(data) {
    let res = await this.request(`auth/customer/login`, data, 'post');
    return res;
  }

  // return object containing { firstName, lastName, email }
  static async saveProfile(userId, type, profileData) {
    let res = await this.request(`${type}s/${userId}`, profileData, 'patch');
    return res;
  }

  static async getCustomerAddress(id) {
    let res = await this.request(`customers/${id}`);
    return res.address;
  }

  static async checkout(custId) {
    let res = await this.request(`customers/${custId}/cart/checkout`,{},'post');
    return res;
  }
}

export default ChoredashApi;
