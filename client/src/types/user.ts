export interface Signup {
    loginId: string;
    password: string;
    rePassword?: string;
    name: string;
    nickname: string;
    email: string;
    profileImageId?: number;
}
export interface IUserProfile {
    createdAt: string;
    email: string;
    loginId: string;
    nickname: string;
    profileImageId: number;
}
// 전역상태
export interface IUserData {
    memberId: string | null;
}
export interface IUserContext {
    user: IUserData;
    setUser: React.Dispatch<React.SetStateAction<IUserData>>;
}
