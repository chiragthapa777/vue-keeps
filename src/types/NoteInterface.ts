export interface NoteInterface {
    _id : string;
    title : string;
    desc ?: string;
    tags ?: TagInterface[]
}
export interface TagInterface{
    _id : string;
    name : string;
}
