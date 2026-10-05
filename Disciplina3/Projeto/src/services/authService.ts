import api from './api';
import {
  LoginPayload,
  loginPayloadSchema,
  LoginResponse,
  loginResponseSchema,
} from '../schemas/auth.schema';

export const authService = {
  /**
   * Log in user with credentials and validate response payload
   */
  async login(credentials: LoginPayload): Promise<LoginResponse> {
    const payloadValidation = loginPayloadSchema.safeParse(credentials);
    if (!payloadValidation.success) {
      const firstError = payloadValidation.error.errors[0]?.message || 'Credenciais inválidas';
      throw new Error(firstError);
    }

    const response = await api.post('/auth/login', payloadValidation.data);
    const parsedResponse = loginResponseSchema.safeParse(response.data);

    if (!parsedResponse.success) {
      console.warn('API response did not match schema:', parsedResponse.error);
      // Fallback with minimal raw data if schema parsing has unexpected extra/missing fields
      return {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        image: response.data.image,
        token: response.data.token || response.data.accessToken || '',
      };
    }

    return parsedResponse.data;
  },

  /**
   * Fetch current user profile using stored JWT
   */
  async getMe(): Promise<LoginResponse> {
    const response = await api.get('/auth/me');
    const parsedResponse = loginResponseSchema.safeParse(response.data);
    if (!parsedResponse.success) {
      return response.data as LoginResponse;
    }
    return parsedResponse.data;
  },
};

export default authService;
