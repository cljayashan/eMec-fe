export interface AuthError {
    message: string;
    code?: string;
}

export interface AuthResponse {
    isSuccess: boolean;
    result: {
        accessToken: string;
        refreshToken: string;
    } | null;
    error: AuthError | null;
}