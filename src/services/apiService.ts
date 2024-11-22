import {knockoutDataUrl} from 'constant/api';
import httpService from './httpService';

export default class ApiService {
  static getAllKnockoutData = () => {
    return httpService.get(knockoutDataUrl);
  };
}
