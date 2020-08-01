import axios from 'axios';
import { TOKEN_STORAGE_ID } from '../App.js';

const BASE_URL = process.env.BASE_URL || 'https://choredash-api-sivadej.herokuapp.com/api';

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

  // Authentication API requests:

  static async login(data) {
    let res = await this.request(`auth/customer/login`, data, 'post');
    return res;
  }

  static async register(data) {
    let res = await this.request(`customers`, data, 'post');
    return res;
  }

  static async getUserByToken(token) {
    let res = await this.request(`auth/verify`, { _token: token }, 'post');
    return res;
  }

  // Chores API requests:

  static async getChores(search) {
    let res = await this.request('chores', { search });
    return res;
  }

  static async getChoreByCode(code) {
    console.log('getting chore with code', code);
    let res = await this.request(`chores/${code}`);
    return res;
  }

  // Customer model API requests:

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
      { item: { item_code: itemCode }, action: 'REMOVE' },
      'patch'
    );
    return res;
  }

  static async getOrders(custId, userType) {
    let res = await this.request(`${userType}s/${custId}/orders`);
    return res;
  }

  static async getOrderDetail(orderId) {
    let res = await this.request(`orders/${orderId}`);
    return res;
  }

  static async getCustomerAddress(id) {
    let res = await this.request(`customers/${id}`);
    return { address: res.address, location: res.current_location };
  }

  static async saveProfile(userId, type, profileData) {
    let res = await this.request(`${type}s/${userId}`, profileData, 'patch');
    return res;
  }

  // provider API requests:

  static async getPendingOrder(providerId) {
    let res = await this.request(`providers/${providerId}/pending`);
    return res;
  }

  static async getProviderData(id) {
    let res= await this.request(`providers/${id}`);
    return res;
  }

  // active order user flow API requests:

  static async checkout(custId) {
    let res = await this.request(
      `customers/${custId}/cart/checkout`,
      {},
      'post'
    );
    return res;
  }

  static async acceptOrder(orderId, providerId) {
    let res = await this.request(`orders/${orderId}/accept/${providerId}`,{},'post');
    return res;
  }

  static async rejectOrder(orderId, providerId) {
    let res = await this.request(`orders/${orderId}/reject/${providerId}`,{},'post');
    return res;
  }

  static async completeOrder(orderId) {
    let res = await this.request(`orders/${orderId}/complete`,{},'post');
    return res;
  }
}

export default ChoredashApi;
