interface SelfType {
    [x: string]: any;
    id?: number;
    name?: string;
    email?: string;
    profileImage?: string;
    loggedBy?: string;
    UserInfo?: Array<{
        id: number;
        date?: string;
        gender?: string;
        phone?: string;
        cep?: string;
        neighborhood?: string;
        ddd?: string;
        locality?: string;
        publicPlace?: string;
        uf?: string;
    }>;

    PetterInfo?: Array<{
        id: number;
        petterName?: string;
        petterBirth?: string;
        petterKind?: string;
        petterBreed?: string;
        petterGender?: string;
        profileImage?: string;
        descriptionBio?: string;
    }>;
}

export default SelfType;
