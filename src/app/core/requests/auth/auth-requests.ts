export interface AuthRequest {
    action: string;
    attributes: {
        userName: string;
        password?: string;
        refreshToken?: string;
    };
}