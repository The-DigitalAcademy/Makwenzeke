export interface AppUser {
    id: string,
    displayName: string,
    email: string,
    password: string
}

// used when creating a new User on register/signup.
export type AppUserData = Omit<AppUser, 'id'>;