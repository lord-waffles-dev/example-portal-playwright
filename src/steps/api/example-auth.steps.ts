import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../../support/custom-world';
import { ApiClient } from '../../utils/apiClient';
import { AuthResponse } from '../../models/api/auth.model';
import { config } from '../../support/config';

Given('I authenticate with the API', async function (this: ICustomWorld) {
  const apiClient = new ApiClient(this.server!);

  const authData = {
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    userName: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD
  };

  const response = await apiClient.post(`${config.BASE_API_URL}auth/v1/login/agent`, authData);

  if (response.status() !== 200) {
    throw new Error(`Authentication failed: ${response.statusText()}`);
  }

  this.authData = await response.json() as AuthResponse;

  // console.log('Auth data:', this.authData);
  console.log('Successfully authenticated with the API');
});
