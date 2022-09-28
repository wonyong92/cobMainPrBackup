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
    memberId: number | undefined;
    loginId: string | undefined;
    email: string | undefined;
    name: string | undefined;
    nickname: string | undefined;
    createdAt: string | undefined;
    profileImageId: number | undefined;
}
export interface IUserContext {
    user: IUserData;
    setUser: React.Dispatch<React.SetStateAction<IUserData>>;
}
