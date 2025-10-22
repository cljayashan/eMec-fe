export interface AuthResponse {
    isSuccess: boolean;
    result: {
        accessToken: string;
        refreshToken: string;
    } | null;
    error: any;
}