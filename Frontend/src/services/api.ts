export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  student: Student;
}

export interface MessageResponse {
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL.replace(/\/$/, '');
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getStudent(): Student | null {
    const raw = localStorage.getItem('student');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public setStudent(student: Student): void {
    localStorage.setItem('student', JSON.stringify(student));
  }

  public clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('student');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    const token = this.getToken();
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // sends HTTP-only refresh cookies
    });

    let data: any = {};
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (!response.ok) {
      const errorMsg =
        data.error?.message ||
        data.detail ||
        data.message ||
        `Request failed with status ${response.status}`;
      const error: any = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data as T;
  }

  public async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (res.access_token) {
      this.setToken(res.access_token);
    }
    if (res.student) {
      this.setStudent(res.student);
    }
    return res;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.access_token) {
      this.setToken(res.access_token);
    }
    if (res.student) {
      this.setStudent(res.student);
    }
    return res;
  }

  public async getMe(): Promise<Student> {
    const student = await this.request<Student>('/api/v1/auth/me', {
      method: 'GET',
    });
    this.setStudent(student);
    return student;
  }

  public async refreshToken(): Promise<{ access_token: string; token_type: string; expires_in: number }> {
    const res = await this.request<{ access_token: string; token_type: string; expires_in: number }>(
      '/api/v1/auth/refresh',
      {
        method: 'POST',
      }
    );
    if (res.access_token) {
      this.setToken(res.access_token);
    }
    return res;
  }

  public async logout(): Promise<MessageResponse> {
    try {
      return await this.request<MessageResponse>('/api/v1/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.clearAuth();
    }
  }

  public async forgotPassword(email: string): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  public async resetPassword(token: string, new_password: string): Promise<MessageResponse> {
    return this.request<MessageResponse>('/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password }),
    });
  }

  public getGoogleAuthUrl(): string {
    return `${this.baseUrl}/api/v1/auth/oauth/google`;
  }
}

export const api = new ApiService();
