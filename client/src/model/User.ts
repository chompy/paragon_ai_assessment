export type User = {
    _id: string
    username: string
};

export const isUserLoggedIn = (user: User): boolean => {
    return !!user._id;
}